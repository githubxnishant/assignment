import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "users",
    initialState: [],
    reducers: {
        addUser: (state, action) => {
            console.log("Action user", action);
            state.push(action.payload);           
        },

        updateUser: (state, action) => {
            const { name, newName } = action.payload;
            return state.map(user =>
                user.name === name ? { ...user, name: newName } : user
            );
        },        
        
        deleteUser: (state, action) => {
            return state.filter(user => user.name !== action.payload.name);
        },
    }
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
