import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import useOnlinestatus from '../utils/useOnlineStatus';
import UserContext from '../utils/UserContext';
import Shimmer from './Shimmer';
import Rescard, { withPromatedLabel } from './Rescard';

const Body = () => {
  const [resList, setResList] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [searchText, setsearchText] = useState('');

  const onlineStatus = useOnlinestatus();

  const { loggedUser, setUserName } = useContext(UserContext)

  const PromatedLabel = withPromatedLabel(Rescard);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const url = 'https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING';
    const data = await fetch(url);
    const json = await data.json();
    setResList(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilterList(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  }

  const handleChange = (e) => {
    setsearchText(e.target.value);
  }

  const handleSearch = () => {
    const filteredSerachData = resList.filter((res) => res.info.name.toLowerCase().includes(searchText.toLowerCase()));
    setFilterList(filteredSerachData);
  }

  const handleTopRated = () => {
    const filteredSerachData = filterList.filter((res) => res.info.avgRating >= 4.2);
    setFilterList(filteredSerachData);
  }

  if (onlineStatus === false) {
    return <h1>Looks like you are Offline</h1>
  }

  return (resList?.length === 0) ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter flex px-[200px]">
        <div className='search p-4'>
          <input
            className="border border-solid border-black"
            onChange={handleChange}
            type="text"
            value={searchText}
          />
          <button
            className="px-4 py-2 bg-green-100 my-4 mx-3  rounded-lg"
            onClick={handleSearch}>
            Search
          </button>
        </div>
        <div className="search my-4 flex items-center">
          <button
            className="px-4 py-2 bg-gray-100 rounded-lg"
            onClick={handleTopRated}>
            Top Rated Restaurant
          </button>
        </div>
        <div className='my-10 mx-4'>
          <label htmlFor="userName">User Name</label>
          <input className='py-1 px-2 mx-2 border border-solid border-black'
            value={loggedUser}
            onChange={(e) => setUserName(e.target.value)}
            type="text" />
        </div>
      </div>
      <div className="grid grid-cols-4 place-items-center container mx-auto px-[200px]">
        {filterList.map((item) => {
          return (
            <Link key={item.info.id} to={'/restaurants/' + item.info.id}>
              {item.info.promoted ? (
                <PromatedLabel resList={item} />
              ) : (
                <Rescard resList={item} />
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
};

export default Body;