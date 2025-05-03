import { useSelector } from "react-redux";
import Bagitem from "../components/bagitem";
import Bagsummary from "../components/Bagsummary";

const Bag=()=>{

const bagitem=useSelector(store=>store.bag);
const items=useSelector(store=>store.items);
const finalitem=items.filter((items)=>{
  const itemidx=bagitem.indexOf(items.id);
  return itemidx>=0;
})


  

   return <>
    <main>
      <div class="bag-page">
        <div class="bag-items-container">
          {finalitem.map(item=><Bagitem item={item}/>)}
          
        </div>
         <Bagsummary/>
      </div>
    </main>     
   </>
}
export default Bag;