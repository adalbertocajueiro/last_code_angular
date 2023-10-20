import { Injectable } from '@angular/core';
import { IMqttMessage, MqttService } from 'ngx-mqtt';
import { Subscription } from 'rxjs';
import { MetaInfoObject } from '../models';
import { environment } from './../environments/environment';
import { METAINFO_TOPIC } from './topics';

@Injectable({
  providedIn: 'root',
})
export class metainfoService {
  private _mqttService: MqttService;
  private _client: MqttService;

  private subscriptionmetainfo: Subscription | undefined;

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

  get client(){
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

  subscribemetainfo(callback: (message: IMqttMessage) => void) {
    const topicName = METAINFO_TOPIC;

    this.subscriptionmetainfo = this._client
      ?.observe(topicName, { qos: 0 })
      .subscribe(callback);
  }

  unsubscribemetainfo() {
    this.subscriptionmetainfo?.unsubscribe();
  }

  unsafePublishmetainfo(payload: MetaInfoObject) {
    const topicName = METAINFO_TOPIC;
    const stringfiedPayload = JSON.stringify(payload);

    this._client.unsafePublish(topicName, stringfiedPayload, { qos: 0 });
  }
}
