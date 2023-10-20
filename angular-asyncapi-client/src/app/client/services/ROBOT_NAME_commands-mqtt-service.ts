import { Injectable } from '@angular/core';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { Subscription } from 'rxjs';
import { CommandObject } from '../models';
import { environment } from './../environments/environment';
import { ROBOT_NAME_COMMANDS_TOPIC } from './topics';

@Injectable({
  providedIn: 'root',
})
export class ROBOT_NAME_commandsService {
  private _mqttService: MqttService;
  private _client: MqttService;

  private subscriptionROBOT_NAME_commands: Subscription | undefined;

  MQTT_SERVICE_OPTIONS = {
    hostname: environment.broker.hostname,
    port: environment.broker.port,
    clean: environment.broker.clean,
    connectTimeout: environment.broker.connectTimeout,
    reconnectPeriod: environment.broker.reconnectPeriod,
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

  subscribeROBOT_NAME_commands(callback: (message: IMqttMessage) => void) {
    const topicName = ROBOT_NAME_COMMANDS_TOPIC;

    this.subscriptionROBOT_NAME_commands = this._client
      ?.observe(topicName, { qos: 0 })
      .subscribe(callback);
  }

  unsubscribeROBOT_NAME_commands() {
    this.subscriptionROBOT_NAME_commands?.unsubscribe();
  }

  unsafePublishROBOT_NAME_commands(payload: CommandObject) {
    const topicName = ROBOT_NAME_COMMANDS_TOPIC;
    const stringfiedPayload = JSON.stringify(payload);

    this._client.unsafePublish(topicName, stringfiedPayload, { qos: 0 });
  }
}
