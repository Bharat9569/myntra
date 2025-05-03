import {createSlice} from '@reduxjs/toolkit'


const bagSlice=createSlice({
name:'bag',
initialState:[],
reducers:{
addTobag:(state,action)=>{
         state.push(action.payload);
     },
removeFrombag:(state,action)=>{
    return state.filter(itemId=>itemId!==action.payload);
}


}
})
export const bagAction=bagSlice.actions;
export default bagSlice;