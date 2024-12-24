import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import useOnlinestatus from '../utils/useOnlineStatus';
import UserContext from '../utils/UserContext';
import Shimmer from './Shimmer';
import Rescard, { withPromatedLabel } from './Rescard';
import { useDispatch, useSelector } from 'react-redux';
import { setOnYourMind, setRestaurantList, setTopRestaurantList } from '../utils/restaurantSlice';
import OnYourMind from './OnYourMind';
import TopRestaurant from './TopRestaurant';

const Body = () => {
  // const [resList, setResList] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [searchText, setsearchText] = useState('');

  const dispatch = useDispatch();
  const restaurantList = useSelector((store) => store.restaurant.restaurantList);
  // console.log(rse)

  const onlineStatus = useOnlinestatus();

  const { loggedUser, setUserName } = useContext(UserContext)

  const PromatedLabel = withPromatedLabel(Rescard);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const url = 'https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING';
    // const url = 'https://www.swiggy.com/mapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=28.5763126&lng=77.4788014&carousel=true&third_party_vendor=1';
    const data = await fetch(url);
    const json = await data.json();
    // console.log()
    dispatch(setOnYourMind(json?.data?.cards[0]?.card?.card?.imageGridCards?.info));
    dispatch(setTopRestaurantList(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants));
    dispatch(setRestaurantList(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants));
    // setResList(
    //   json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    // );
    setFilterList(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  }

  const handleChange = (e) => {
    setsearchText(e.target.value);
  }

  const handleSearch = () => {
    const filteredSerachData = restaurantList.filter((res) => res.info.name.toLowerCase().includes(searchText.toLowerCase()));
    setFilterList(filteredSerachData);
  }

  const handleTopRated = () => {
    const filteredSerachData = filterList.filter((res) => res.info.avgRating >= 4.2);
    setFilterList(filteredSerachData);
  }

  if (onlineStatus === false) {
    return <h1>Looks like you are Offline</h1>
  }

  return (restaurantList?.length === 0) ? (
    <Shimmer />
  ) : (
    <div className="body">
      <OnYourMind />

      <TopRestaurant />
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
      <div className='container'>
        <div className="common-head">
          <h2>Restaurants with online food delivery in Noida</h2>
          <div>
            <span>⬅️</span>
            <span>➡️</span>
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
    </div>
  )
};

export default Body;