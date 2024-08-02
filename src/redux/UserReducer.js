import { createSlice } from "@reduxjs/toolkit";
import { userList } from "../Data";

const userSlice = createSlice({
    name: "users",
    initialState: userList,
    reducers: {
        addUser: (state, action) => {
            console.log("Action user",action);
            state.push(action.payload)
            // Add your logic to handle the state update here

            updateUser:(state,action) => {

                const { id,name,email } = action.payload;
                const uu = state.find(user => user.id == id)
                if(uu){
                    
                }


            }
        }
    }
});

export const { addUser,updateUser } = userSlice.actions; // Corrected property name
export default userSlice.reducer;
