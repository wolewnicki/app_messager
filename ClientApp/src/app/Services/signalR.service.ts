import { Injectable, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Message } from '../Models/Message';

@Injectable()
export class SignalRService {


    constructor() { }

    public connection : signalR.HubConnection
    public data: Message[]

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
                let messageCombined = {message: message, user: user}
                this.data.push(messageCombined)
                console.log(messageCombined)
            })
    }

    sendMessage(message: string, user: string) {
        this.connection
            .invoke('SendMessage', user, message)
            .then(() => console.log("Sent Message"))
            .catch(err => console.log(err))
    }
}