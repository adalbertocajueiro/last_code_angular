import { Injectable } from '@angular/core';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { BehaviorSubject, Subscription } from 'rxjs';
import { MovedObject } from '../models';
import { environment } from './../environments/environment';
import { ROBOT_NAME_MOVED_TOPIC } from './topics';

@Injectable({
  providedIn: 'root',
})
export class ROBOT_NAME_movedService {
  private _mqttService: MqttService;
  private _client: MqttService;

  private subscriptionROBOT_NAME_moved: Subscription | undefined;

  MQTT_SERVICE_OPTIONS = {
    hostname: environment.broker.hostname,
    port: environment.broker.port,
    clean: environment.broker.clean,
    connectTimeout: environment.broker.connectTimeout,
    reconnectPeriod: environment.broker.reconnectPeriod,
    connectOnCreate: true,
    clientId: crypto.randomUUID(),
  };

  constructor() {
    this._mqttService = new MqttService(this.MQTT_SERVICE_OPTIONS);
    this._client = this._mqttService;
  }

  get client() {
    return this._client;
  }

  createConnection() {
    try {
      this._client?.connect();
    } catch (error) {
      console.log('mqtt.connect error', error);
    }
    this._client?.onConnect.subscribe(() => {
      console.log('Connection succeeded!');
    });
    this._client?.onError.subscribe((error: any) => {
      console.log('Connection failed', error);
    });
    this._client?.onMessage.subscribe((packet: any) => {
      console.log(
        `Received message ${packet.payload} from topic ${packet.topic}`
      );
    });
  }

  subscribeROBOT_NAME_moved(callback: (message: IMqttMessage) => void) {
    const topicName = ROBOT_NAME_MOVED_TOPIC;

    this.subscriptionROBOT_NAME_moved = this._client
      ?.observe(topicName, { qos: 0 })
      .subscribe(callback);
  }

  unsubscribeROBOT_NAME_moved() {
    this.subscriptionROBOT_NAME_moved?.unsubscribe();
  }

  unsafePublishROBOT_NAME_moved(payload: MovedObject) {
    const topicName = ROBOT_NAME_MOVED_TOPIC;
    const stringfiedPayload = JSON.stringify(payload);
    
    this._client.unsafePublish(topicName, stringfiedPayload, { qos: 0 });
  }
}
