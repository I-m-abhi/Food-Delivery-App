import { useState } from "react";
import { useParams } from "react-router";
import Shimmer from "./Shimmer";
import useResMenu from "../utils/useResMenu";
import ResCategory from "./ResCategory";

const Resmenu = () => {
  const [showIndex, setShowIndex] = useState(null);

  const { resId } = useParams();

  const resInfo = useResMenu(resId);

  if (resInfo === null) {
    return <Shimmer />
  }
  const { name, cuisines, costForTwoMessage } = resInfo?.cards[2]?.card?.card?.info;

  const categories = resInfo.cards[4].groupedCard.cardGroupMap.REGULAR.cards.filter(c =>
    c.card?.card?.['@type'] ===
    'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory'
  );

  return (
    <div className="text-center">
      <h1 className="font-bold my-6 text-2xl">{name}</h1>
      <p className="font-bold text-lg">
        {cuisines.join(", ")} - {costForTwoMessage}
      </p>
      {/* categories accordions */}
      {categories.map((category, index) => (
        <ResCategory
          key={category?.card?.card.title}
          data={category?.card?.card}
          showItems={index === showIndex && true}
          setShowIndex={() => setShowIndex(index)}
        />
      ))}
    </div>
  )
};

export default Resmenu;





