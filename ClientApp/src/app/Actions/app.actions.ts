import { Message } from '../Models/app.models'

export class AddMessage {
    static readonly type = 'ADD_MESSAGE'

    constructor(public payload: Message) {}
}