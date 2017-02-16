/* eslint no-fallthrough: 0 react/no-multi-comp: 0*/
import client from '../../utils/fetch_helper'

export const SET_DISPLAY_VIEW = 'view: SET DISPLAY VIEW'
export const SET_DATA = 'view: SET DATA'
export const SET_DISPLAY_CHAT_MODAL = 'view: SET DISPLAY CHAT MODAL'
export const SET_FEMINISM_TWEETS = 'view: SET FEMINISM TWEETS'
export const SET_JAVASCRIPT_TWEETS = 'view: SET JAVASCRIPT TWEETS'
 
// function calls action creater setTokenId 
// that returns the object with type and payload and that's called the action
// have action now, so then redux function calls store.dispatch and passes it the action
export const VIEW_ACTION_CREATORS = {
    setDisplayView: (view) => ({
        type: SET_DISPLAY_VIEW,
        payload: { view }
    }),
    setData: (data) => ({
        type: SET_DATA,
        payload: data 
    }),
    setDisplayChatModal: (bool) => ({
        type: SET_DISPLAY_CHAT_MODAL,
        payload: bool
    }),
    setFeminismTweets: (data) => ({
        type: SET_FEMINISM_TWEETS,
        payload: data 
    }),
    setJavascriptTweets: (data) => ({
        type: SET_JAVASCRIPT_TWEETS,
        payload: data 
    })
}

export const INITIAL_STATE = {
    displayView: true,
    view: 'feminism',
    data: [],
    displayChatModal: false,
    feminismTweets: [],
    javascriptTweets: [],
}

// the store then calls this function with the action object
// then returns new state
// then store takes new state then passes it to any component listening 
export default function viewReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_DISPLAY_VIEW: {
            const { view } = action.payload // const formMode = action.payload.formMode
            
            return {
                ...state,
                displayView: true, 
                view
            }
        }

        case SET_DATA: {
            const data = action.payload
            
            return {
                ...state,
                data
            }
        }

        case SET_DISPLAY_CHAT_MODAL: {
            const bool = action.payload

            return {
                ...state,
                displayChatModal: bool
            }
        }

        case SET_FEMINISM_TWEETS: {
            const data = action.payload

            return {
                ...state,
                feminismTweets: data
            }
        }

        case SET_JAVASCRIPT_TWEETS: {
            const data = action.payload

            return {
                ...state,
                javascriptTweets: data
            }
        }

        default: return state

    }
}
