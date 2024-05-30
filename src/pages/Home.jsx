import travelImage from "../assets/MGF.webp";

const Home = () => {
  return (
    <div
      className=" z-0 p-0 -m-0 flex flex-col items-center justify-center bg-purple-200 text-purple-900"
      style={{ minHeight: "calc(100vh - 64px)" }}
    >
      <img
        src={travelImage}
        alt="Travel"
        className="w-3/4 sm:w-1/2 lg:w-1/3 mb-4 rounded-3xl"
      />
      <div className="text-center text-xl font-bold">
        사진을 찍어 당신의 여행을 시작하세요!
      </div>
    </div>
  );
};

export default Home;
