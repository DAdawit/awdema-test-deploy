import SimpleProductCard from "../ProductCards/SimpleProductCard";
import Image from "next/image";
import SpecialOffers from "./SpecialOffers";
const Grocery = ({ grosseries }) => {
  return (
    <>
      {/* <pre>{JSON.stringify(grosseries, null, 2)}</pre> */}

      <div className="grid lg:flex gap-3 px-5">
        <div className="flex justify-start ">
          <Image
            src="/image 129 (1).png"
            width="300"
            height="300"
            alt="img"
            className="max-h-64"
          />
        </div>

        <div className="flex gap-2 flex-wrap justify-center px-5">
          {grosseries.objects.map((product) => (
            <div key={product.id}>
              <SimpleProductCard id={product.id} product={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Grocery;
