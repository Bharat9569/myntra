import {configureStore} from '@reduxjs/toolkit';
import itemSlice from './itemslice';
import FetchStatusslice from './fetchStatusslice';
import bagSlice from './bagslice';
import authSlice from './authslice';

const myntaStore=configureStore({
     reducer:{
       items:itemSlice.reducer,
       fetchStatus:FetchStatusslice.reducer,
       bag:bagSlice.reducer,
       auth:authSlice.reducer,

     }
})

export default myntaStore;