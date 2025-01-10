import cn from "@/config/cn";

const Message = ({ msg, className }: { msg: string; className?: string }) => {
  return (
    <p
      className={cn(
        "self-center p-7 text-lg font-normal text-grayscale-500 text-center w-full",
        className
      )}
    >
      {msg}
    </p>
  );
};

export default Message;
