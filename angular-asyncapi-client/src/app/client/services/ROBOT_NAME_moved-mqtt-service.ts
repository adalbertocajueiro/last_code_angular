import { Injectable } from '@angular/core';
import { ROBOT_NAME_MOVED_TOPIC } from './topics';
import { BaseService } from './base-service';

@Injectable({
  providedIn: 'root',
})
export class ROBOT_NAME_movedService extends BaseService{
  constructor() {
    super();
    this.topic = ROBOT_NAME_MOVED_TOPIC;
  }
}
