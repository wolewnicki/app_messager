import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChannelModel } from './fetch-data.component'
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class FetchDataService {
    fetchDataUrl = 'v1/app-messager/GetChannel';

    constructor(private http: HttpClient) { }

    getChannel() {
        debugger;
        return this.http.get<ChannelModel>(this.fetchDataUrl)
    }
}