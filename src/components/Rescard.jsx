import { RES_IMG_CDN } from "../utils/constant";

const Rescard = ({ resList }) => {
  const {
    cloudinaryImageId,
    name,
    avgRating,
    cuisines,
    costForTwo,
  } = resList.info;

  return (
    <div className="m-4 p-4 w-[250px] h-[420px] rounded-lg bg-gray-100 hover:bg-gray-200">
      <img className='rounded-lg w-[230px] h-[150px]' src={RES_IMG_CDN + cloudinaryImageId} alt="res-logo" />
      <h3 className="font-bold py-4 text-lg">{name}</h3>
      <h4 className="py-2">{cuisines.join(', ')}</h4>
      <h4 className="py-2">{costForTwo}</h4>
      <h4 className="py-2">⭐ {avgRating}</h4>
      <h4 className="py-2">{resList?.info?.sla?.deliveryTime} Minutes</h4>
    </div>
  )
};

// Higher order Component
export const withPromatedLabel = (ResCard) => {
  return (props) => {
    return (
      <div>
        <label>Promoted</label>
        <ResCard {...props} />
      </div>
    );
  };
};

export default Rescard;