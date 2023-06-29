import EditSubCategory from "./EditSubCategory";
import ShopDescription from "./ShopDescription";
import SubCategoriesChangeCoverPicture from "./SubCategoryChangeCoverPicture";

const SubCategoriesList = ({ subCategory, index, refetch }) => {
  return (
    <tr className="bg-white border-b hover:bg-gray-100 " key={index}>
      <td>{index + 1}</td>
      <td
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
      >
        {/* eslint-disable-next-line */}
        <img
          className="w-10 h-10 rounded-full object-cover"
          src={
            subCategory?.image
              ? `https://awdma.afroel.com/media/${subCategory?.image}`
              : "/avatar.png"
          }
          alt="Rounded avatar"
        />
      </td>
      <td class="px-6 py-4 capitalize">{subCategory?.name}</td>
      <td className="px-6 py-4 ">
        {subCategory.description.length > 50 ? (
          <div>
            <p> {subCategory?.description.slice(0, 50) + `...`}</p>
            <ShopDescription description={subCategory?.description} />
          </div>
        ) : (
          <p>{subCategory?.description} </p>
        )}
      </td>
      <td className="col-span-2">
        <EditSubCategory subCategory={subCategory} refetch={refetch} />
        <SubCategoriesChangeCoverPicture
          subCategory={subCategory}
          refetch={refetch}
        />
      </td>
    </tr>
  );
};

export default SubCategoriesList;
