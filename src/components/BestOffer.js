const BestOffer = (props) => {
  const { bO } = props;
  const { imageId } = bO;
  return (
    <img
      className="h-72 cursor-pointer shadow-xl rounded-3xl w-96 mx-5"
      src={
        "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/" +
        imageId
      }
      alt="bo"
    />
  );
};
export default BestOffer;
