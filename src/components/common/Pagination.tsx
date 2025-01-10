import Image from "next/image";
import assets from "@/variables/images";
import cn from "@/config/cn";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}) => {
  const range = (start: number, end: number) => {
    return Array.from({ length: end - start + 1 }, (_, i) => i + start);
  };

  const generatePages = (current: number, total: number) => {
    if (total <= 5) {
      return range(1, total);
    }

    if (current <= 3) {
      return [...range(1, 5), "...", total];
    }

    if (current >= total - 5) {
      return [1, "...", ...range(total - 4, total)];
    }

    return [1, "...", current - 1, current, current + 1, "...", total];
  };

  const styles = {
    disabled: "disabled:opacity-50 disabled:cursor-not-allowed",
    buttonSize:
      "flex items-center justify-center w-[34px] h-[34px] pc:w-[48px] pc:h-[48px]",
  };

  const handlePageChange = (page: number | string) => {
    if (typeof page !== "number") return;
    if (currentPage !== page) {
      onPageChange(page);
    }
  };

  const pages = generatePages(currentPage, totalPages);

  return (
    <div className={cn("flex justify-center w-full", className)}>
      <div className="flex items-center gap-2 pc:justify-between pc:w-[476px]">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={cn(styles.disabled, styles.buttonSize)}
        >
          <Image
            src={assets.icons.chevronLeft}
            width={24}
            height={24}
            alt="left"
            className="w-[24px] h-[24px]"
          />
        </button>
        <ol className="flex items-center gap-1">
          {pages.map((page, index) => (
            <li
              key={index}
              className={cn(
                styles.buttonSize,
                page === currentPage ? "font-bold" : "",
                typeof page === "number" ? "cursor-pointer" : ""
              )}
              onClick={() => handlePageChange(page)}
            >
              {page === "..." ? (
                <Image
                  src={assets.icons.ellipsis}
                  width={34}
                  height={34}
                  alt="ellipsis"
                  className="w-[34px] h-[34px]"
                />
              ) : (
                page
              )}
            </li>
          ))}
        </ol>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={cn(styles.disabled, styles.buttonSize)}
        >
          <Image
            src={assets.icons.chevronRight}
            width={24}
            height={24}
            alt="right"
            className="w-[24px] h-[24px]"
          />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
