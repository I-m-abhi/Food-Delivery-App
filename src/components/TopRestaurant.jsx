import { useSelector } from "react-redux";
import { Link } from "react-router";
import Rescard from "./Rescard";

const TopRestaurant = () => {
  const topRestaurantList = useSelector((store) => store.restaurant.topRestaurantList);
  return (
    <div className="container">
      <div className="common-head">
        <h2>Top restaurant chains in Noida</h2>
        <div>
          <span>⬅️</span>
          <span>➡️</span>
        </div>
      </div>
      <div className="topRestaurant">
        {topRestaurantList.map((restaurant) => {
          return (
            <Link key={restaurant.info.id} to={'/restaurants/' + restaurant.info.id}>
              <Rescard resList={restaurant} />
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default TopRestaurant;
