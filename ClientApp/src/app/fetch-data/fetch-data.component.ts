import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FetchDataService } from './fetch-data.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html',
  providers: [ FetchDataService ]
})
export class FetchDataComponent {
  channel: ChannelModel;
  error: any;

  constructor(private fetchDataService: FetchDataService) {}


  getData() {
    this.fetchDataService.getChannel()
    .subscribe(
      (data: ChannelModel) => this.channel = {
        id: data.id,
        created_by: data.created_by,
        created_date: data.created_date,
        description: data.description
       },
      error => this.error = error
    );
  }
}

export class ChannelModel {
  id : number;
  created_by: string;
  created_date: Date;
  description: string;
}
