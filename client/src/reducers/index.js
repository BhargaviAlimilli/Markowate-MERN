let user;

if (window.localStorage.getItem("auth")) {
  user = JSON.parse(window.localStorage.getItem("auth"))
} else {
  user = null
}

export const authReducer = (state = user, action) => {

    if(action.type==='LOGGED_IN'){
        return { ...state, ...action.payload }
    }

    if(action.type==='LOGOUT'){
        return action.payload;
    }

    else{
        return state
    }
}
