import { configureStore } from '@reduxjs/toolkit';
import UserReducer from '../redux/UserReducer';


const store = configureStore({
    reducer:{
      // here user is a variable 
      //UserReducer in which data is reside .
      users:UserReducer
    }
  })

  export default store