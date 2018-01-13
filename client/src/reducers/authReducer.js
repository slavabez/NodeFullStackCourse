const initialState = {};

export default function(state = initialState, action) {
    console.log(action);
    switch (action.type){
        default:
            return state;
    }
}