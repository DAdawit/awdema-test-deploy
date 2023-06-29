import IconDelivery from "@/Icons/IconDelivery";
import Link from "next/link";
const BecomeDeliverer = () => {
  return (
    <>
      <Link
        href="/delivery/signup"
        className="flex justify-center items-center gap-2 px-2 py-1 bg-last text-white text-lg rounded-md  fixed bottom-10 right-0 z-10 mb-3 mr-2"
      >
        <span> Become Deliverer</span>
        <span>
          <IconDelivery />
        </span>
      </Link>
    </>
  );
};

export default BecomeDeliverer;
