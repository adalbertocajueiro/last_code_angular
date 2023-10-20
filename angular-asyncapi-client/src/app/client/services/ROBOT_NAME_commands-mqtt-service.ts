import { Injectable } from '@angular/core';
import { ROBOT_NAME_COMMANDS_TOPIC } from './topics';
import { BaseService } from './base-service';

@Injectable({
  providedIn: 'root',
})
export class ROBOT_NAME_commandsService extends BaseService{

  constructor() {
    super();
    this.topic = ROBOT_NAME_COMMANDS_TOPIC;
  }
}
