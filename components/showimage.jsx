import { Image } from "cloudinary-react";

export default function showImage({ imageid }) {
  const imageId = { imageid };
  const imageurl = `https://res.cloudinary.com/dnnjgmqo0/image/upload/c_scale,f_auto,h_400,q_auto,w_400/v1/${imageid}`;
  return (
    <div className="relative w-full h-96">
      <img src={imageurl} alt="image" />
    </div>
  );
}
