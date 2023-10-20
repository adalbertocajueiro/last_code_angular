import { AfterViewInit, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ALL_TOPICS } from '../services/topics';
import { ClientImplementationService } from '../implementation/client_implementation';
import { MetaInfoObject } from '../models';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})

export class MainpageComponent implements OnInit,OnChanges {
  
  connectedToBroker:boolean = false
  allTopics = ALL_TOPICS
  selectedTopic?:string
  selectedTopicPayload:any

  @ViewChild("topics") topics?: ElementRef
  
  constructor(private clientImplementationService: ClientImplementationService){
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isConnectedToBroker();
  }

  ngOnInit(): void {
    this.selectedTopic = this.allTopics[0][0]
    this.changeSelectedTopic()
    this.isConnectedToBroker()
  }

  isConnectedToBroker(){
    this.connectedToBroker  = this.clientImplementationService.areServicesConnectedToBroker()
  }

  changeSelectedTopic(){
    const selectedElement =
      this.allTopics.find((ele: any[]) => ele[0] === this.selectedTopic)
    if (selectedElement) {
      var newObj = Reflect.construct(selectedElement[1], [])
      this.selectedTopicPayload = this.buildObject(Object.keys(newObj as any))
    }
  }

  buildObject(keys:string[]){
    const result:any = {}
    keys.map(n=>n.substring(1)).forEach(k => result[k] = 'undefined')
    return result
  }

  convertClassStructureToJson(classStructure:any){
    return Object.keys(classStructure)
  }
}
