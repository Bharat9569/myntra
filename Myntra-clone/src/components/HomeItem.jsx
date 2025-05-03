import { useDispatch, useSelector } from "react-redux";
import { bagAction } from "../store/bagslice";

const HomeItem=({item})=>{
    const dispatch=useDispatch();
    const bag=useSelector(store=>store.bag);
    const itemFound=bag.indexOf(item.id)>=0;

    const handleAddbutton=()=>{
        dispatch(bagAction.addTobag(item.id));
    }

    const handleRemovebutton=()=>{
        dispatch(bagAction.removeFrombag(item.id));
    }
    return (
        <div class="item-container">
        <img class="item-image" src={item.image} alt="item image"/>
        <div class="rating">
            {item.rating.stars} ⭐ | {item.rating.count}
        </div>
        <div class="company-name">{item.company}</div>
        <div class="item-name">{item.item_name}</div>
        <div class="price">
            <span class="current-price">Rs {item.current_price}</span>
            <span class="original-price">Rs {item.original_price}</span>
            <span class="discount">({item.discount_percentage}% OFF)</span>
        </div>
          {
          
          itemFound   ?  <button type="button" class="btn-add-bag2 btn btn-danger" onClick={handleRemovebutton}>Remove</button>
         : <button type="button" class=" btn-add-bag1 btn btn-success" onClick={handleAddbutton}>AddToBag</button>
          }
            
         
      </div>
    )
}
export default HomeItem;