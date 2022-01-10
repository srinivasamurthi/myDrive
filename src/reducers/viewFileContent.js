const defaultState = {
    fileOpenBoolean : false,
    modalOpenBoolean : false,
    viewContent : {},
}

export default (state = defaultState, action) => {

    switch (action.type) {
        case "SET_VIEW_CONTENT" : {
            
            if(action.viewContentShow === true)
                return{
                    ...state,
                    fileOpenBoolean : true,
                    modalOpenBoolean : false,
                    viewContent : action.viewContent,
                }
            
                return{
                    ...state,
                    fileOpenBoolean : false,
                    modalOpenBoolean : true,
                    viewContent : action.viewContent,
                }
        }

        case "REMOVE_VIEW_CONTENT" : {
            return {
                ...state,
                fileOpenBoolean : false,
                modalOpenBoolean : false,
                viewContent : {},
            }
        }

        default :
            return state;

    }
}