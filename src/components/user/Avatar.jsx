import Image from "next/image";
import { AuthContext } from "@/context/authContext";
import { useContext } from "react";
const Avatar = () => {
  const { user, auth } = useContext(AuthContext);
  return (
    <>
      {auth ? (
        <Image
          className="object-cover w-14 h-14 rounded-full"
          src={
            user.profilePicture
              ? `https://awdma.afroel.com/media/${user.profilePicture}`
              : "/avatar.png"
          }
          width="100"
          height="100"
          alt="user profile"
        />
      ) : null}
    </>
  );
};
export default Avatar;
