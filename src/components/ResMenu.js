import useMenu from "../utils/hooks/useMenu";
import { useParams } from "react-router-dom";
import RestaurantCategory from "./RestaurantCategory";
import {  useState } from "react";

import { useSelector } from "react-redux";
import { link } from "./constants";

import Header from "./Header";
import Shimmer from "./Shimmer";

const ResMenu = () => {
 
  const cart = useSelector((store) => store.cart.items);
  const { resId } = useParams();
  const [showIndex, setShowIndex] = useState(0);
  // useEffect(() => {
  //   dispatch(addResId(resId));
  // }, []);
  const resInfo = useMenu(resId);

  const offer =
    resInfo?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.offers;
  console.log(offer);

  const resName = resInfo?.cards[0]?.card?.card?.info;

  const categories =
    resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );
    console.log(resInfo);

  return (
    <>
      <Header />
      <div className="w-1/2  mx-[25%]">

        <div className="pt-10 ">
          <div className="flex justify-between p-2">
            <div>
              <h1 className="font-semibold text-xl">
                <span>{resName?.name}</span>
              </h1>
              <h1 className="text-gray-400">
                <span>{resName?.cuisines.join(", ")}</span>
              </h1>
              <h1 className="text-gray-400">
                <span>{resName?.areaName}</span>
              </h1>
            </div>
            <div className="border border-gray-200 px-2   rounded-lg">
              <h1 className="text-green-700 text-center mt-3 font-bold">
                <span>{resName?.avgRating} ☆</span>
              </h1>
              <h1 className="border-t  text-gray-500  ">
                <span>{resName?.totalRatingsString}</span>
              </h1>
            </div>
          </div>
          <div className="border-t border-b border-dotted  border-gray-400 mt-5 p-6">
            <div className=" flex  ">
              <h1 className="font-bold">
                <span>{resName?.sla?.deliveryTime} MINS</span>
              </h1>
              <h1 className="mx-10 font-bold">
                <span>{resName?.costForTwoMessage}</span>
              </h1>
            </div>
            <div className="  mt-4 flex overflow-x-scroll no-scrollbar  ">
              {offer
                ? offer.map((off) => (
                    <div
                      className="border rounded-lg mx-1 p-2  "
                      key={off?.info?.restId}
                    >
                      <img
                        className="w-8 p-1 h-8"
                        src={link + off?.info?.offerLogo}
                        alt="logo"
                      />
                      <span>
                        <h1 className="font-bold -mt-7  text-gray-600 ml-8 w-40">
                          {off?.info?.header}
                        </h1>
                      </span>

                      <h1 className="w-52 text-xs font-sans font-bold mt-2 text-gray-400">
                        {off?.info?.couponCode} |{off?.info?.description}
                      </h1>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>

        {categories
          ? categories.map((category, index) => (
              <RestaurantCategory
                data={category?.card?.card}
                showItems={index === showIndex ? true : false}
                setShowIndex={() => setShowIndex(index)}
              />
            ))
          : null}
      </div>
    </>
  );
};
export default ResMenu;
