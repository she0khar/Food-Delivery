import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-black flex  text-white p-60">
      <div>
        <img
          className="h-40 w-80 -ml-20 -mt-40 "
          src="Food-delivery-logo-with-bike-man-on-transparent-background-PNG.png"
          alt="foot"
        />
        <h1 className="text-white -ml-36 font-bold text-3xl">
          Food Delievery ©
        </h1>
      </div >
      <div className="  mx-32 -mt-32 ">
        <ul>
          <li>
            <h1 className="text-xl my-4 font-semibold font-sans">Company</h1>
          </li>
         <Link to="/about"> <li className="text-gray-500 cursor-pointer my-3">about</li></Link>
          <li className="text-gray-500 cursor-pointer my-3">careers</li>
          <li className="text-gray-500 cursor-pointer my-3">team</li>
        </ul>
      </div>
      <div className="mx-20 -mt-32">
        <ul>
          <li>
            <h1 className="text-xl my-4 font-semibold font-sans">Contact Us</h1>
          </li>
          <li className="text-gray-500 cursor-pointer my-3">help & support</li>
          <li className="text-gray-500 cursor-pointer my-3">partner with us</li>
        </ul>
      </div>
      <div className="mx-20 -mt-32">
        <ul>
          <li>
            <h1 className="text-xl my-4 font-semibold font-sans">legal</h1>
          </li>
          <li className="text-gray-500 cursor-pointer my-3">terms & conditions</li>
          <li className="text-gray-500 cursor-pointer my-3">privacy policy</li>
        </ul>
      </div>
    </div>
  );
};
export default Footer;
