const Banner = (props) => {
    const{banInfo} = props;
    const{imageId} = banInfo;
    
  return (
   
        
      <img
        className="h-52 w-52 cursor-pointer bg-gray-100 rounded-full mx-5"
        src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/"+imageId}
        alt="kfc"
      />
      
     
  );
};
export default Banner;
