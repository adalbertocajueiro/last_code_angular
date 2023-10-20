import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

import { ClientImplementationService } from '../implementation/client_implementation';
import { ALL_TOPICS } from '../services/topics';
import { BaseService } from '../services/base-service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})

export class MainpageComponent implements OnInit {
  
  connectedToBroker:boolean = false
  allTopics = ALL_TOPICS
  topicsMapping?:any[][]
  selectedTopic?:string
  selectedTopicPayload:any
  selectedService?:BaseService

  receivedTopicPayload: any

  @ViewChild("topics") topics?: ElementRef
  
  constructor(
      private clientImplementationService: ClientImplementationService){

      this.topicsMapping = clientImplementationService.TOPICS_MAPPING   
  }


  ngOnInit(): void {
    this.selectedTopic = this.allTopics[0]
    this.clientImplementationService.metainfoSubject.subscribe(
      {
        next: (res) => {
          //console.log('message received',res)
          this.receivedTopicPayload = res
        },
        error: (err) => {
          //console.log('error',err)
          this.receivedTopicPayload = undefined
        }
      }
    )

    this.clientImplementationService.ROBOT_NAME_commandsSubject.subscribe(
      {
        next: (res) => {
          //console.log('message received', res)
          this.receivedTopicPayload = res
        },
        error: (err) => {
          //console.log('error', err)
          this.receivedTopicPayload = undefined
        }
      }
    )

    this.clientImplementationService.ROBOT_NAME_movedSubject.subscribe(
      {
        next: (res) => {
          //console.log('message received', res)
          this.receivedTopicPayload = res
        },
        error: (err) => {
          //console.log('error', err)
          this.receivedTopicPayload = undefined
        }
      }
    )

    this.changeSelectedTopic()
    this.isConnectedToBroker()
  }

  isConnectedToBroker(){
    this.connectedToBroker  = this.clientImplementationService.areServicesConnectedToBroker()
  }

  changeSelectedTopic(){
    const selectedElement =
      this.topicsMapping?.find((ele: any[]) => ele[0] === this.selectedTopic)
    if (selectedElement) {
      var newObj = Reflect.construct(selectedElement[1], [])
      this.selectedTopicPayload = this.buildObject(Object.keys(newObj as any))
      this.selectedService = selectedElement[2]
      //this.selectedTopicPayload.publisher_id = this.selectedService?.MQTT_SERVICE_OPTIONS.clientId
      this.receivedTopicPayload = undefined
    }
  }

  buildObject(keys:string[]){
    const result:any = {}
    keys.map(n=>n.substring(1)).forEach(k => result[k] = 'undefined')
    return result
  }

  sendMessage(){
    this.selectedService?.unsafePublish(this.selectedTopicPayload)
  }
}
