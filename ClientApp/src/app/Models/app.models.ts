export class Message {
    message: string
    user: string
}

export class Channel {
    name : string
    description : string
    messages : Message[]
    adminUID : string
    adminName: string
}