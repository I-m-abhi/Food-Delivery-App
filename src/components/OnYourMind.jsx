import { useSelector } from "react-redux";
import { RES_IMG_CDN } from "../utils/constant";

const OnYourMind = () => {
  const onYourMind = useSelector((store)=>store.restaurant.onYourMind);

  return (
    <div className='container'>
      <div className="common-head">
        <h2>What's on your mind?</h2>
        <div>
          <span>⬅️</span>
          <span>➡️</span>
        </div>
      </div>
      <div className="onYourMind">
        {onYourMind.map((element) => {
          return (
            <div className='img-container'>
              <img src={RES_IMG_CDN + element.imageId} alt="" />
            </div>
          )
        })}
      </div>
    </div>
  )
};

export default OnYourMind;