import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FetchDataService } from './fetch-data.service';
import { ThrowStmt } from '@angular/compiler';
import { SignalRService } from '../Services/signalR.service';
import { Message } from '../Models/Message';
import { sendMessage } from '@microsoft/signalr/dist/esm/Utils';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html',
  providers: [ FetchDataService, SignalRService ]
})
export class FetchDataComponent implements OnInit {
  channels: ChannelModel[];
  error: any;
  data: Message[];
  user: string;
  message: string;

  constructor(private fetchDataService: FetchDataService, 
              private signalRService: SignalRService) { }

  ngOnInit() {
    this.signalRService.createConnection()
    this.signalRService.startConnection()
    this.signalRService.addListener()
    this.signalRService.data = [{message: 'test', user: 'nico'}, 
    {message: 'to list lmao', user: 'nico'}]
    this.data = this.signalRService.data
  }

  checkChannel() {
    console.log(this.channels);
    console.log(this.signalRService.data);
  }

  sendMessage(message: string, user: string){
    let messageCombined: Message = {message: message, user: user}

    console.log(messageCombined)
    this.signalRService.sendMessage(message, user)
    this.data = this.signalRService.data
  }

  getData() {
    this.fetchDataService.getChannel()
    .subscribe(
      (data: ChannelModel[]) => this.channels = data,
      error => this.error = error,
    );
  }
}


export class ChannelModel {
  id : number;
  created_by: string;
  created_date: Date;
  description: string;
}
