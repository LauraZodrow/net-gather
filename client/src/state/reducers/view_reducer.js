/* eslint no-fallthrough: 0 react/no-multi-comp: 0*/
export const SET_DISPLAY_VIEW = 'view: SET DISPLAY VIEW'
export const SET_DATA = 'view: SET DATA'
export const SET_TWITTER_BTN_TEXT = 'view: SET TWITTER BTN TEXT'
 
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
    setTwitterBtnText: (text) => ({
        type: SET_TWITTER_BTN_TEXT,
        payload: { text }
    }),
}

// const view = localStorage.getItem('view')
// let displayView = false
// if (view) {
//   displayView = true
// } 

export const INITIAL_STATE = {
    displayView: true,
    view: 'feminism',
    data: [],
    twitterBtnText: 'feminism'
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

        case SET_TWITTER_BTN_TEXT: {
            const { text } = action.payload
            
            return {
                ...state,
                twitterBtnText: text
            }
        }

        default: return state

    }
}
