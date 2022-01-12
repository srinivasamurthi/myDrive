const defaultState = {
    viewType : "list",
}

export default (state = defaultState, action) => {

    switch (action.type) {
        case "SET_VIEW" : {
                return{
                    ...state,
                    viewType : action.viewType,
                }
        }
        default :
            return state;

    }
}