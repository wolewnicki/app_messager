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
  channels: ChannelModel[];
  error: any;

  constructor(private fetchDataService: FetchDataService) {}

  checkChannel() {
    console.log(this.channels);
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
