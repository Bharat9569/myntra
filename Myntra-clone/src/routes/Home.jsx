

import { useSelector } from 'react-redux';
import HomeItem from '../components/HomeItem.jsx';



const Home=()=>{
  const item=useSelector((store)=>store.items);
  
  if (!Array.isArray(item)) {
    return <div>Error: Expected items to be an array</div>;
  }
 
    return(
         <main>
                <div class="items-container">
                 { item.map(item => <HomeItem key={item.id} item={item}/>)}
                </div>
            </main>
    )
}
export default Home;