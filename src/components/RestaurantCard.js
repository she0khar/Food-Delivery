import { link } from "./constants";

const RestaurantCard = (props) => {
 
  const{resInfo} = props;
  const { name, cuisines, avgRating, cloudinaryImageId, costForTwo } = resInfo?.info;
  const{deliveryTime} = resInfo?.info?.sla;
  return (
    <div className="cursor-pointer ">
      <img
        className="rounded-xl h-60 w-full"
        src={link + cloudinaryImageId}
        alt="res"
      />
      <div className="flex justify-between p-2 ">
        <div className="w-2/3  ">
          <h1 className=" text-xl font-semibold font-sans">{name}</h1>
          <p className="text-gray-500 whitespace-nowrap  overflow-hidden overflow-ellipsis font-sans">{cuisines.join(" ,")}</p>
        </div>
        <div className="my-1 ">
          <h3 className="bg-green-800 rounded-lg px-2 ml-11  relative text-right font-sans font-semibold text-white">
            {avgRating} ✩
          </h3>
          <h3 className="text-gray-500 text-right ">{costForTwo}</h3>
          <h3 className="text-gray-800 ml-10">{deliveryTime} mins</h3>
        </div>
      </div>
    </div>
  );
};
export default RestaurantCard;
