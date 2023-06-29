import Image from "next/image";

const Loading = () => {
  return (
    <>
      <div className="relative h-screen">
        <div className="absolute bg-white bg-opacity-60 z-10 h-full w-full flex items-center justify-center">
          <div className="flex flex-col items-center">
            <h1 className="text-primary text-2xl font-normal">
              Loading ... Please Wait !
            </h1>
            <Image src="/loading.svg" width="300" height="300" alt="loading" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
