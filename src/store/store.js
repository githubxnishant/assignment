import { configureStore } from '@reduxjs/toolkit';
import UserReducer from '../redux/UserReducer';
import TodoReducer from '../redux/TodoReducer';


const store = configureStore({
    reducer:{
      users:UserReducer, 
      todos:TodoReducer,
    }
  })

  export default store