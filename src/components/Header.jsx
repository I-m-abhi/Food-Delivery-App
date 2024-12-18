import { useContext, useState } from "react";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import useOnlinestatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { LOGO_URL } from "../utils/constant";

const Header = () => {
  const [user, setUser] = useState('Log in');

  const onlineStatus = useOnlinestatus();

  const { loggedUser } = useContext(UserContext);

  const cardItems = useSelector((store) => store.cart.items);

  const userStatus = () => {
    if (user === 'Log in') {
      setUser('Log out');
    } else {
      setUser('Log in');
    }
  }
  
  return (
    <div className="flex justify-between items-center bg-pink-100 shadow-lg sm:bg-yellow-50 lg:bg-green-50 px-[100px]">
      <div>
        <img className="w-12" src={LOGO_URL} alt="Logo Defines" />
      </div>
      <nav className="flex items-center">
        <ul className="flex p-4 m-4">
          <li className="px-3">{(onlineStatus === true) ? 'Online Status: ✅' : 'Online Status: 🔴'}</li>
          <li className="px-3"><Link to='/'>Home</Link></li>
          <li className="px-3"><Link to='/about'>About us</Link></li>
          <li className="px-3"><Link to='/contact'>Contact us</Link></li>
          <li className="px-3"><Link to='/grocery'>Grocery</Link></li>
          <li className="px-3 font-bold"><Link to='/cart'>Cart : {cardItems.length}</Link></li>
          <li className="px-3"><button onClick={userStatus}>{user}</button></li>
          <li className="px-3 font-bold"><button>{loggedUser}</button></li>
        </ul>
      </nav>
    </div>
  )
};

export default Header;