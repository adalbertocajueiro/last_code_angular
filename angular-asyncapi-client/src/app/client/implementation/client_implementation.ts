import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { metainfoService } from '../services/metainfo-mqtt-service';
import { ROBOT_NAME_commandsService } from '../services/ROBOT_NAME_commands-mqtt-service';
import { ROBOT_NAME_movedService } from '../services/ROBOT_NAME_moved-mqtt-service';

import { MetaInfoObject } from '../models';
import { CommandObject } from '../models';
import { MovedObject } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ClientImplementationService {
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
    this.metainfoService.subscribemetainfo((message) => {
      const subscribeMessage = MetaInfoObject.from_json(
        JSON.parse(message.payload.toString())
      );
      console.log('Handled message: ' + subscribeMessage.toString());
      if (
        subscribeMessage.publisher_id === undefined ||
        subscribeMessage.publisher_id !==
          this.metainfoService.MQTT_SERVICE_OPTIONS.clientId
      ) {
        subscribeMessage.publisher_id =
          this.metainfoService.MQTT_SERVICE_OPTIONS.clientId;
        this.metainfoService.unsafePublishmetainfo(subscribeMessage);
      }
      // TODO: Implement your code here
    });

    this.ROBOT_NAME_commandsService.subscribeROBOT_NAME_commands((message) => {
      const subscribeMessage = CommandObject.from_json(
        JSON.parse(message.payload.toString())
      );
      console.log('Handled message: ' + subscribeMessage.toString());
      if (
        subscribeMessage.publisher_id === undefined ||
        subscribeMessage.publisher_id !==
          this.ROBOT_NAME_commandsService.MQTT_SERVICE_OPTIONS.clientId
      ) {
        subscribeMessage.publisher_id =
          this.ROBOT_NAME_commandsService.MQTT_SERVICE_OPTIONS.clientId;
        this.ROBOT_NAME_commandsService.unsafePublishROBOT_NAME_commands(
          subscribeMessage
        );
      }
      // TODO: Implement your code here
    });

    this.ROBOT_NAME_movedService.subscribeROBOT_NAME_moved((message) => {
      const subscribeMessage = MovedObject.from_json(
        JSON.parse(message.payload.toString())
      );
      console.log('Handled message: ' + subscribeMessage.toString());
      if (
        subscribeMessage.publisher_id === undefined ||
        subscribeMessage.publisher_id !==
          this.ROBOT_NAME_movedService.MQTT_SERVICE_OPTIONS.clientId
      ) {
        subscribeMessage.publisher_id =
          this.ROBOT_NAME_movedService.MQTT_SERVICE_OPTIONS.clientId;
        this.ROBOT_NAME_movedService.unsafePublishROBOT_NAME_moved(
          subscribeMessage
        );
      }
      // TODO: Implement your code here
    });
  }

  unsubscribeToAllServices() {
    this.metainfoService.unsubscribemetainfo();
    this.ROBOT_NAME_commandsService.unsubscribeROBOT_NAME_commands();
    this.ROBOT_NAME_movedService.unsubscribeROBOT_NAME_moved();
  }
}
