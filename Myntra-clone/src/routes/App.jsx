import '../index.css';
import Header from '../components/Header';
import Footer from '../components/footer';
import { Outlet } from 'react-router';
import FetchItem from '../components/fetchitem';
import Loader from '../components/Loader';
import { useSelector } from 'react-redux';

function App() {
  
  const fetchStatus=useSelector((store)=>store.fetchStatus);
  return <>
    <Header/>
  
    <FetchItem/>
    {
      fetchStatus.currentlyFetching ?   <Loader/>: <Outlet/>
    }
    
    <Footer/>
    </>
  
}

export default App;
