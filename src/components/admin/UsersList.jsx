import Image from "next/image";
import Link from "next/link";
import moment from "moment";
const UsersList = ({ user, index }) => {
  return (
    // <div>
    <tr className="bg-white border-b hover:bg-gray-100 " key={index}>
      <td class="px-6 py-4">{index + 1}</td>

      <td
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
      >
        {/* eslint-disable-next-line */}
        <img
          className="w-10 h-10 rounded-full object-cover"
          src={
            user.profilePicture
              ? `https://awdma.afroel.com/media/${user.profilePicture}`
              : "/avatar.png"
          }
          alt="Rounded avatar"
        />
      </td>
      <td className="px-6 py-4 capitalize">{user?.username}</td>
      <td class="px-6 py-4 capitalize">
        {user?.firstName} {user?.lastName}
      </td>
      <td className="px-6 py-4 ">{user?.phone}</td>
      <td className="px-6 py-4 ">{user?.email}</td>
      <td className="px-6 py-4 ">
        {moment(user?.dateJoined).format("MMM Do YY")}
      </td>
      <td>
        <h1
          className={
            user?.isSeller
              ? `bg-green-400 px-1 py-1 rounded-lg text-center text-white`
              : `bg-red-500 px-1 py-1 rounded-lg text-center text-white`
          }
        >
          {user?.isSeller ? "Seller" : "False"}
        </h1>
      </td>
      <td className="px-6 py-4 ">
        <h1
          className={
            user?.isDeliverer
              ? `bg-green-400 px-1 py-1 rounded-lg text-center text-white`
              : `bg-red-500 px-1 py-1 rounded-lg text-center text-white`
          }
        >
          {user?.isDeliverer ? "Deliverer" : "False"}
        </h1>
      </td>
    </tr>
    // </div>
  );
};

export default UsersList;
