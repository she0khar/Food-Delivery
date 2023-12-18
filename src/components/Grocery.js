import { Link } from "react-router-dom";

const Grocery = () => {
  return <div className="text-center">
    <img className="w-[25%] h-[50%] ml-[35%]" alt="logo" src="/apnastore.png"/>
    <h1 className="text-8xl font-bold text-gray-400">Coming Soon...</h1>
    <h1 className="mt-32 p-3 border w-40 ml-[44%] font-semibold bg-green-500  text-white underline"><Link to="/body">back to FD</Link></h1>
  </div>;
};
export default Grocery;
