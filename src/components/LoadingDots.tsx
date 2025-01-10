export default function LoadingDots() {
  return (
    <div className="flex justify-center items-center mt-4 gap-2">
      <div
        className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
        style={{ animationDelay: "0ms", animationDuration: "1s" }}
      ></div>
      <div
        className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
        style={{ animationDelay: "200ms", animationDuration: "1s" }}
      ></div>
      <div
        className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
        style={{ animationDelay: "400ms", animationDuration: "1s" }}
      ></div>
    </div>
  );
}
