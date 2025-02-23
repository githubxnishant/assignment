const SET_ACTIVE_TAB = "SET_ACTIVE_TAB";

export const setActiveTab = (tab) => ({
    type: SET_ACTIVE_TAB,
    payload: tab,
});

const initialState = localStorage.getItem("activeTab") || "todos";

const tabReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ACTIVE_TAB:
            localStorage.setItem("activeTab", action.payload);
            return action.payload;
        default:
            return state;
    }
};

export default tabReducer;
