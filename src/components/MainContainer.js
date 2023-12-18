import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import Banner from "./Banner";
import BestOffer from "./BestOffer";
import { Link } from "react-router-dom";

const MainContainer = () => {
  const [bo, setBo] = useState([]);
  const [baner, setBaner] = useState([]);
  const [listOfRes, setListOfRes] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.2513844&lng=81.62964130000002&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();

    console.log(json);
    setBo(json?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.info);
    setBaner(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.info
    );
    setListOfRes(
      json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };
  if (listOfRes.length === 0) {
    return <Shimmer />;
  }
  const bO = bo?.info;
  const banInfo = baner?.info;
  const resInfo = listOfRes?.info;
  console.log(resInfo);
  return (
    <div >
      <div className="mt-5 p-2  border-b  pb-5 ">
        <h1 className=" ml-20 font-bold text-3xl">Best Offer For You</h1>
        <div className="mt-10 ml-10 mr-10 flex overflow-x-scroll no-scrollbar">
          {bo.map((offer) => (
            <BestOffer bO={offer} key={offer?.id} />
          ))}
        </div>
      </div>
      <div className="border-b border-b-slate-200  mt-10 p-2">
        <h1 className="font-bold ml-20  text-3xl ">What's on your mind?</h1>
        <div className="  mt-4 pb-3 flex ml-20 mr-16 overflow-scroll no-scrollbar px-3">
          {baner.map((ban) => (
            <Banner banInfo={ban} key={ban?.id} />
          ))}
        </div>
      </div>
      <div className=" flex flex-wrap p-5 ml-11 ">
        {listOfRes.map((res) => (
        <Link className="mx-10  mt-2 w-[27%] rounded-xl hover:shadow-lg my-2   p-2  " key={res.info.id} to={"/restaurants/"+res.info.id} > <RestaurantCard resInfo={res}  /></Link>
        ))}
      </div>
    </div>
  );
};
export default MainContainer;
