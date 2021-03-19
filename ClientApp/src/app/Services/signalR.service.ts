import { Injectable, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Store } from '@ngxs/store';
import { AddMessage } from '../Actions/app.actions';
import { Message } from '../Models/app.models';

@Injectable()
export class SignalRService {


    constructor(public store: Store ) { }

    public connection : signalR.HubConnection

    createConnection() {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl('https://localhost:5001/chathub')
            .build();
    }

    startConnection(){
        this.connection
            .start()
            .then(() => console.log('Connection Started.'))
            .catch(err => console.log('Problem Starting the connection...' + err))
    }

    addListener() {
        this.connection
            .on('RecieveMessage', (message: string, user: string) => {
                this.store.dispatch(new AddMessage({
                    user: user,
                    message: message
                }))
            })
    }

    sendMessage(message: string, user: string) {
        debugger
        this.connection
            .invoke('SendMessage', user, message)
            .then(() => this.store.dispatch(new AddMessage({user, message})))
            .then(() => console.log("Sent Message"))
            .catch(err => console.log(err))
    }
}