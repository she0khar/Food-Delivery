
import ItemList from "./ItemList";

const RestaurantCategory = ({ data,setShowIndex,showItems }) => {
    
    const handleClick = () => {
        setShowIndex();
    }
  // console.log(data);
  return (
    <div className="my-4 pb-2 border-b-8 ">
      <div className="flex  cursor-pointer justify-between" onClick={handleClick}>
        <span>
          <h1 className="font-bold  text-xl">
            {data?.title} ({data?.itemCards?.length})
          </h1>
        </span>
        <span>
         {showItems?<h1 className="font-bold cursor-pointer px-2">∧</h1>:<h1 className="font-bold cursor-pointer px-2">∨</h1>} 
        </span>
      </div>
      {showItems &&  <ItemList items={data?.itemCards} />}
     
    </div>
  );
};
export default RestaurantCategory;
