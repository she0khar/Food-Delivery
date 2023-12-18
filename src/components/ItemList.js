import { useDispatch } from "react-redux";
import { menu_link } from "../utils/hooks/constants";
import { addItem } from "../utils/cartSlice";

const ItemList = ({ items }) => {
  const dispatch = useDispatch();
  const adding = (item) => {
    dispatch(addItem(item));
   
  };

  return (
    <div>
      <ul>
        {items
          ? items.map((item) => (
              <li
                className="flex border justify-between border-l-transparent border-b-transparent border-gray-300 border-r-transparent my-4 p-3 "
                key={item?.card?.info?.id}
              >
                <div className="w-3/4">
                  <h1 className="self-center font-semibold">
                    {item?.card?.info?.name}
                  </h1>
                  <h1 className="font-semibold">
                    ₹{item?.card?.info?.price / 100}
                  </h1>
                  <h1 className="text-gray-500 mt-3">
                    {item?.card?.info?.description}
                  </h1>
                </div>
                <div>
                  {item?.card?.info?.imageId && (
                    <img
                      className="rounded-lg self-center  h-28 w-32"
                      alt="menu"
                      src={menu_link + item?.card?.info?.imageId}
                    />
                  )}
                  <button
                    className="border bg-white absolute font-semibold -mt-6 ml-3 p-2 w-24 border-gray-500 rounded-lg text-green-600 "
                    onClick={() => adding(item)}
                  >
                    ADD +
                  </button>
                </div>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};
export default ItemList;
