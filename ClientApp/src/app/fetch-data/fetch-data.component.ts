import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FetchDataService } from './fetch-data.service';
import { ThrowStmt } from '@angular/compiler';
import { SignalRService } from '../Services/signalR.service';
import { Message } from '../Models/app.models';
import { sendMessage } from '@microsoft/signalr/dist/esm/Utils';
import { AppStateModel, AppState } from '../State/app.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html',
  providers: [ FetchDataService, SignalRService ]
})
export class FetchDataComponent implements OnInit {
  @Select(AppState.getAppState) appStateObservable: Observable<AppStateModel>

  channels: ChannelModel[];
  error: any;
  currentState: AppStateModel

  constructor(private fetchDataService: FetchDataService, 
              private signalRService: SignalRService,
              private store: Store) { }

  ngOnInit() {
    this.appStateObservable.subscribe(x => this.currentState = x)
    this.signalRService.createConnection()
    this.signalRService.startConnection()
    this.signalRService.addListener()
  }

  checkChannel() {
    console.log(this.channels);
    console.log(this.currentState);
  }

  sendMessage(message: string, user: string){
    let messageCombined: Message = {message: message, user: user}

    this.signalRService.sendMessage(message, user)
    console.log(this.currentState.currentMessages)
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
