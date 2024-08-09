import { Construction } from "lucide-react";

const StatCard = () => {
  return (
    <div className="flex flex-col justify-between md:row-span-1 xl:row-span-2 bg-white shadow-md rounded-2xl p-4">
      <div className="text-base md:text-lg mb-2 pt-2 md:px-20 lg:px-40 xl:px-56 ml-1">
        <span className="text-black">Under Construction</span>
      </div>
      <div className="mb-6 flex justify-center md:text-lg file:pt-2 md:px-20 lg:px-40 xl:px-56">
        <Construction size={48} className="text-yellow-300" />
      </div>
    </div>
  );
};

export default StatCard;
