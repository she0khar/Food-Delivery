import { useEffect, useState } from "react";
const useMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);
  useEffect(() => {
    fetchMenu();
  }, []);
  const fetchMenu = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=21.2513844&lng=81.62964130000002&restaurantId="+resId
    );
    const json = await data.json();

    setResInfo(json?.data);
  };
  return resInfo;
};
export default useMenu;

// ?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.itemCards