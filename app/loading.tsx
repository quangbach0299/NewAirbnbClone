"use client";

import { DotLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="h-[70vh] flex flex-col justify-center items-center">
      <DotLoader size={60} color="red" />
    </div>
  );
};

export default Loading;
