import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: "todos",
    initialState: [], // Ensure it's initialized as an array
    reducers: {
        addTodo: (state, action) => {
            state.push(action.payload);
        },

        updateTodo: (state, action) => {
            const { name, newName } = action.payload;
            return state.map(todo =>
                todo.name === name ? { ...todo, name: newName } : todo
            );
        },

        deleteTodo: (state, action) => {
            return state.filter(todo => todo.name !== action.payload.name);
        }
    }
});

export const { addTodo, updateTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
