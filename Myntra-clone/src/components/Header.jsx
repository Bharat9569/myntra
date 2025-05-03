import { IoPersonSharp } from "react-icons/io5";
import { FaSmile } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authslice";
import { useState } from "react";

const Header = () => {
  const bag = useSelector((store) => store.bag);
  const auth = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showProfile, setShowProfile] = useState(false); 

  const handleLogout = () => {
    dispatch(logout());
    setShowProfile(false); 
    navigate('/login');
  };

 
  const username = auth.isLoggedIn ? auth.user.split('@')[0] : '';
  

  return (
    <header>
      <div className="logo_container">
        <Link to="/">
          <img className="myntra_home" src="images/myntra_logo.webp" alt="Myntra Home" />
        </Link>
      </div>

      <nav className="nav_bar">
        <a href="#">Men</a>
        <a href="#">Women</a>
        <a href="#">Kids</a>
        <a href="#">Home & Living</a>
        <a href="#">Beauty</a>
        <a href="#">Studio <sup>New</sup></a>
      </nav>

      <div className="search_bar">
        <span className="material-symbols-outlined search_icon">search</span>
        <input className="search_input" placeholder="Search for products, brands and more" />
      </div>

      <div className="action_bar">
        {/* Profile or Login */}
        <div className="action_container" onClick={() => setShowProfile(!showProfile)}>
          <IoPersonSharp  /> {'Profile'}
          
          {auth.isLoggedIn ? (
            showProfile && (
              <div className="profile_dropdown">
                <span className="profile_name">{'User :'+username}</span>
                <br />
                <button onClick={handleLogout} className="logout_button">Logout</button>
              </div>
            )
          ) : (
            <Link to="/login" className="action_name">Login</Link>
          )}
        </div>

        {/* Wishlist */}
        <div className="action_container">
          <FaSmile />
          <span className="action_name">Wishlist</span>
        </div>

        {/* Bag */}
        <Link to="/bag" className="action_container">
          <FaShoppingCart />
          <span className="action_name">Bag</span>
          <span className="bag-item-count">{bag.length}</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
