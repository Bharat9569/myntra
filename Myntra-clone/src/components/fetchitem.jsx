
import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { itemAction } from "../store/itemslice";
import { fetchStatusaction } from "../store/fetchStatusslice";

const FetchItem=()=>{
    const fetchStatus=useSelector((store)=>store.fetchStatus);
    const dispatch=useDispatch();
     
    useEffect(()=>{
        if(fetchStatus.fetchDone) 
            return;
        const controller=new AbortController();
        const signal=controller.signal;
         

        dispatch(fetchStatusaction.markFetchingstarted());
        fetch("http://localhost:8080/api/m1/items",{signal})
        .then((res)=>res.json())
        .then(({items})=>{
            console.log('items are',items);
            dispatch(fetchStatusaction.markFetchdone());
            dispatch(fetchStatusaction.markFetchingfinished());
            dispatch(itemAction.addInitialitem(items));
        });
        return ()=>{
            controller.abort();
        };
    },[fetchStatus]);

    return ;
      
    
}
export default FetchItem;   