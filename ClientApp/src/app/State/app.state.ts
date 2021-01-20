import { Selector, State, Action, StateContext } from "@ngxs/store";
import { AddMessage } from "../Actions/app.actions";
import { Channel, Message } from "../Models/app.models";

export class AppStateModel {
    currentChannel: Channel
    channelSet: Channel[]
    currentMessages: Message[]
}

@State<AppStateModel> ({
    name: 'app',
    defaults: {
        currentChannel: null,
        channelSet: [],
        currentMessages: []
    }
})


export class AppState{
    @Selector()
    static getAppState(state: AppStateModel){
        return state
    }

    @Action(AddMessage)
    addMessage({getState, patchState}: StateContext<AppStateModel>, {payload}: AddMessage) {
        const state = getState()
        patchState({
            currentMessages: [...state.currentMessages, payload]
        })
    }
}