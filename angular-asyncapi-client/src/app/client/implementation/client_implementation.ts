import { Injectable } from '@angular/core';
import { metainfoService } from '../services/metainfo-mqtt-service';
import { ROBOT_NAME_commandsService } from '../services/ROBOT_NAME_commands-mqtt-service';
import { ROBOT_NAME_movedService } from '../services/ROBOT_NAME_moved-mqtt-service';

import { MetaInfoObject } from '../models';
import { CommandObject } from '../models';
import { MovedObject } from '../models';
import { METAINFO_TOPIC, ROBOT_NAME_COMMANDS_TOPIC, ROBOT_NAME_MOVED_TOPIC } from '../services/topics';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientImplementationService {

  metainfoSubject:Subject<any> = new Subject<any>()
  ROBOT_NAME_commandsSubject: Subject<any> = new Subject<any>()
  ROBOT_NAME_movedSubject: Subject<any> = new Subject<any>()

  TOPICS_MAPPING: any[][] = [
    [METAINFO_TOPIC, MetaInfoObject, this.metainfoService],
    [ROBOT_NAME_COMMANDS_TOPIC, CommandObject,this.ROBOT_NAME_commandsService],
    [ROBOT_NAME_MOVED_TOPIC, MovedObject, this.ROBOT_NAME_movedService]
  ];

  constructor(
    private metainfoService: metainfoService,
    private ROBOT_NAME_commandsService: ROBOT_NAME_commandsService,
    private ROBOT_NAME_movedService: ROBOT_NAME_movedService
  ) {
    try{
      this.subscribeToAllServices();
    }catch(exception){
      console.log('Some low level problem when trying to subscrbe in broker')
    }
    
  }

  areServicesConnectedToBroker(){
    try{
      return !this.metainfoService.client?.state.closed
        && !this.ROBOT_NAME_commandsService.client?.state.closed
        && !this.ROBOT_NAME_movedService.client?.state.closed
    } catch(exception){
      return false;
    }
    
  }

  subscribeToAllServices() {
    this.metainfoService.subscribe((message) => {
      const subscribeMessage = MetaInfoObject.from_json(
        JSON.parse(message.payload.toString())
      );
      
      console.log('Handled message: ' + subscribeMessage.toString());
      if (
        subscribeMessage.publisher_id === undefined ||
        subscribeMessage.publisher_id !==
          this.metainfoService.MQTT_SERVICE_OPTIONS.clientId
      ) { //if message comes from a different publisher
        subscribeMessage.publisher_id =
          this.metainfoService.MQTT_SERVICE_OPTIONS.clientId;
        this.metainfoSubject.next(subscribeMessage);
      } 
    });

    this.ROBOT_NAME_commandsService.subscribe((message) => {
      const subscribeMessage = CommandObject.from_json(
        JSON.parse(message.payload.toString())
      );
      console.log('Handled message: ' + subscribeMessage.toString());
      
      if (
        subscribeMessage.publisher_id === undefined ||
        subscribeMessage.publisher_id !==
          this.ROBOT_NAME_commandsService.MQTT_SERVICE_OPTIONS.clientId
      ) { //if massage comes from a different publisher
        subscribeMessage.publisher_id =
          this.ROBOT_NAME_commandsService.MQTT_SERVICE_OPTIONS.clientId;
        this.ROBOT_NAME_commandsSubject.next(subscribeMessage);
      }
    });

    this.ROBOT_NAME_movedService.subscribe((message) => {
      const subscribeMessage = MovedObject.from_json(
        JSON.parse(message.payload.toString())
      );
      console.log('Handled message: ' + subscribeMessage.toString());
      
      if (
        subscribeMessage.publisher_id === undefined ||
        subscribeMessage.publisher_id !==
          this.ROBOT_NAME_movedService.MQTT_SERVICE_OPTIONS.clientId
      ) { //if message comes from a different publisher
        subscribeMessage.publisher_id =
          this.ROBOT_NAME_movedService.MQTT_SERVICE_OPTIONS.clientId;
        this.ROBOT_NAME_movedSubject.next(subscribeMessage);
      } 
    });
  }

  unsubscribeToAllServices() {
    this.metainfoService.unsubscribe();
    this.ROBOT_NAME_commandsService.unsubscribe();
    this.ROBOT_NAME_movedService.unsubscribe();
  }
}
