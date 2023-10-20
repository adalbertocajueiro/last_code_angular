import { Injectable } from '@angular/core';
import { METAINFO_TOPIC } from './topics';
import { BaseService } from './base-service';

@Injectable({
  providedIn: 'root',
})
export class metainfoService extends BaseService{
  
  constructor(){
    super();
    this.topic = METAINFO_TOPIC;
  }
}
