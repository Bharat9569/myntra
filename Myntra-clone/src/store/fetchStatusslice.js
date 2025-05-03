import {createSlice} from '@reduxjs/toolkit'


const FetchStatusslice=createSlice({
name:'fetchStatus',
initialState:{
    fetchDone:false,
    currentlyFetching:false
},
reducers:{
markFetchdone:(state)=>{
         state.fetchDone=true;
},
markFetchingstarted:(state)=>{
     state.currentlyFetching=true;
},
markFetchingfinished:(state)=>{
     state.currentlyFetching=false;
}
}
})
export const fetchStatusaction=FetchStatusslice.actions;
export default FetchStatusslice;