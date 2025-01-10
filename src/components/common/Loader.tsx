const Loader = ({ msg = "로딩중" }: { msg?: string }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 self-center p-8">
      <div className="w-[50px] h-[50px] border-solid border-[8px] border-pr-blue-100 border-t-pr-blue-300 rounded-full animate-[spin_1s_linear_infinite]"></div>
      <p className="text-grayscale-500 text-align-center text-lg">{`${msg}...`}</p>
    </div>
  );
};

export default Loader;
