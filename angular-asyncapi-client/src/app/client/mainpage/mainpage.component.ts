import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ALL_TOPICS } from '../services/topics';
import { ClientImplementationService } from '../implementation/client_implementation';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})

export class MainpageComponent implements OnInit,OnChanges{
  
  connectedToBroker:boolean = false
  allTopics = ALL_TOPICS
  selectedTopic?:string
  
  constructor(private clientImplementationService: ClientImplementationService){

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.isConnectedToBroker();
  }

  ngOnInit(): void {
    this.selectedTopic = this.allTopics[0]
    this.isConnectedToBroker()
  }

  isConnectedToBroker(){
    this.connectedToBroker  = this.clientImplementationService.areServicesConnectedToBroker()
  }

  changeSelectedTopic(event:any){
    var options: HTMLOptionsCollection = event.target.options
    const index = options.selectedIndex
    if(index != -1){
      this.selectedTopic = options.item(index)?.value
      console.log(this.selectedTopic)
    }
    
  }
}
