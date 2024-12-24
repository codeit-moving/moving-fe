export const BackDrop = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-[#141414] bg-opacity-50 fixed inset-0 flex flex-col items-center justify-end tablet:justify-center pc:justify-center">
      <div className="flex flex-col items-center justify-center mx-auto bg-transparent w-full">
        {children}
      </div>
    </div>
  );
};

export default BackDrop;
