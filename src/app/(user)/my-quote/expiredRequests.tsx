"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Package } from "lucide-react";
import LineSeparator from "@/components/common/LineSeparator";
import {
  fetchCustomerMovingRequests,
  fetchRequestQuotes,
} from "@/api/pendingQuote";
import ReceivedQuoteCard from "@/components/cards/ReceivedQuoteCard";
import cn from "@/config/cn";
import {
  Dropdown,
  DropdownList,
  DropdownItem,
  DropdownImage,
  DropdownFilter,
} from "@/components/common/Dropdown";

interface MovingRequest {
  id: number;
  service: number;
  movingDate: string;
  pickupAddress: string;
  dropOffAddress: string;
  requestDate: string;
  isConfirmed: boolean;
  status?: string;
}

interface Mover {
  id: number;
  nickname: string;
  imageUrl: string | null;
  career: number;
  introduction: string;
  isDesignated: boolean;
  isFavorite: boolean;
  rating: {
    "1": number;
    "2": number;
    "3": number;
    "4": number;
    "5": number;
    totalCount: number;
    totalSum: number;
    average: number;
  };
  reviewCount: number;
  confirmCount: number;
  favoriteCount: number;
}

interface Quote {
  id: number;
  cost: number;
  comment: string;
  isConfirmed: boolean;
  movingRequest: MovingRequest;
  mover: Mover;
}

interface QuoteDetail {
  id: number;
  quotes: Quote[];
  filterType: number;
}

const DROPDOWN_QUOTE_LIST: string[] = ["전체", "확정한 견적서"];
const ALL_QUOTE: number = 0;
const CONFIRMED_QUOTE: number = 1;

const MovingIcon = () => (
  <div className="hidden tablet:flex bg-gray-50 rounded-2xl p-2 h-[160px] w-[160px] items-center justify-center border-solid border-2 border-gray-100 shadow-border">
    <Package
      width={104}
      height={104}
      strokeWidth={1.5}
      className="text-gray-300"
    />
  </div>
);
const StatusBadge = ({
  movingDate,
  isConfirmed,
}: {
  movingDate: string;
  isConfirmed: boolean;
}) => {
  const now = new Date();
  const moveDate = new Date(movingDate);
  const isFuture = moveDate > now;

  const getStatusText = () => {
    if (isFuture) return "진행예정 요청";
    if (isConfirmed) return "확정된 요청";
    return "만료된 요청";
  };

  // 진행예정일 때는 녹색 계열 사용
  const colorClasses = isFuture
    ? "text-emerald-600 bg-emerald-50"
    : "text-pr-blue-300 bg-pr-blue-100";

  return (
    <div
      className={`gap-1 rounded-[4px] py-1 px-2 items-center flex flex-row ${colorClasses}`}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 26L7.15928 25.6525C7.9634 23.898 8.45024 22.015 8.59724 20.0907L9.12162 13.226C9.47615 8.58495 13.3454 5 18 5V5C22.6546 5 26.5239 8.58495 26.8784 13.226L27.4028 20.0907C27.5498 22.015 28.0366 23.898 28.8407 25.6525L29 26"
          stroke={isFuture ? "#059669" : "#1B92FF"}
          strokeWidth="2"
        />
        <path
          d="M29 26H7L9 21L10 11L12.5 6.5L18 5L23 6.5L26 11L27 21L29 26Z"
          fill={isFuture ? "#059669" : "#1B92FF"}
        />
        <path
          d="M7 26L29 26"
          stroke={isFuture ? "#059669" : "#1B92FF"}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M21 29C21 30.6569 19.6569 32 18 32C16.3431 32 15 30.6569 15 29"
          stroke={isFuture ? "#059669" : "#1B92FF"}
          strokeWidth="2"
        />
      </svg>
      {getStatusText()}
    </div>
  );
};

const RequestDetails = ({ request }: { request: MovingRequest }) => {
  const movingDate = new Date(request.movingDate);
  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
  const now = new Date();
  const isFuture = movingDate > now;

  const formatDateTime = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}. ${month}. ${day}. ${hours}시 ${minutes}분`;
  };

  return (
    <div className="flex flex-col gap-3 text-lg font-medium text-left">
      <div className="flex flex-col pc:flex-row items-start pc:items-center gap-1 pc:gap-3">
        <StatusBadge
          movingDate={request.movingDate}
          isConfirmed={request.isConfirmed}
        />
      </div>

      <div className="text-lg tablet:text-xl pc:text-2xl text-gray-500">
        {formatDateTime(movingDate)} ({weekDays[movingDate.getDay()]})에
        {isFuture ? " 진행 예정인 무빙" : " 진행한 무빙"}
      </div>

      <div className="flex flex-col gap-1">
        <DetailRow
          label="견적 요청일"
          value={formatDateTime(new Date(request.requestDate))}
        />
        <DetailRow
          label="서비스"
          value={
            request.service === 1
              ? "소형이사"
              : request.service === 2
              ? "가정이사"
              : request.service === 3
              ? "사무실이사"
              : "기타"
          }
        />
        <DetailRow label="출발지" value={request.pickupAddress} />
        <DetailRow label="도착지" value={request.dropOffAddress} />
      </div>
    </div>
  );
};

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex gap-4">
    <div className="text-gray-500">{label}</div>
    <div>{value}</div>
  </div>
);

const QuoteFilterDropdown = ({
  onSelect,
  disabled,
  filterType,
}: {
  onSelect: (regionCode: number) => void;
  disabled: boolean;
  filterType: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentFilter, setCurrentFilter] = useState<string>(
    DROPDOWN_QUOTE_LIST[filterType]
  );

  const dropdownStyles = {
    base: "relative box-border flex flex-row justify-between items-center \
    pl-3.5 pr-2.5 w-[127px] h-[36px] \
    border-solid border-[1px] border-grayscale-100 rounded-lg \
    bg-transparent shadow-[4px_4px_10px_rgba(238,238,238,0.1)] \
    text-black-400 \
    cursor-pointer \
    pc:rounded-2xl pc:px-[24px] pc:w-[190px] pc:h-[48px] pc:text-lg",
    able: "shadow-md hover:bg-pr-blue-50",
    open: "border-pr-blue-300 text-pr-blue-300",
    disabled: "cursor-not-allowed",
  };

  const dropdownTriggerClass = cn(dropdownStyles.base, {
    [dropdownStyles.able]: !disabled,
    [dropdownStyles.open]: isOpen,
    [dropdownStyles.disabled]: disabled,
  });

  const dropdownListClass = cn(
    "absolute flex flex-col items-center overflow-hidden \
    top-10 w-[127px] \
    border-solid border-[1px] border-line-100 rounded-lg \
    bg-white \
    pc:top-[52px] pc:w-[190px] z-10"
  );

  const dropdownItemClass = cn(
    "flex flex-col justify-center \
    px-3.5 w-full h-[36px] \
    text-md text-black-400 font-medium \
    hover:bg-pr-blue-50 \
    cursor-pointer \
    pc:px-[24px] pc:h-[48px] pc:text-lg"
  );

  const handleSortChange = (code: number) => {
    setCurrentFilter(DROPDOWN_QUOTE_LIST[code]);
    onSelect(code);
    setIsOpen(false);
  };

  const items = DROPDOWN_QUOTE_LIST.map((items, index) => {
    return {
      label: items,
      onClick: () => handleSortChange(index),
    };
  });

  return (
    <Dropdown
      trigger={
        <div className={dropdownTriggerClass}>
          <DropdownFilter>{currentFilter}</DropdownFilter>
          <DropdownImage isOpen={isOpen} />
        </div>
      }
      isOpen={isOpen}
      onToggle={() => setIsOpen((prev) => !prev)}
    >
      <DropdownList
        className={dropdownListClass}
        items={items.map((item, index) => (
          <DropdownItem
            key={index}
            className={dropdownItemClass}
            onClick={item.onClick}
          >
            {item.label}
          </DropdownItem>
        ))}
      />
    </Dropdown>
  );
};

const ExpiredRequests = () => {
  const [expiredRequests, setExpiredRequests] = useState<MovingRequest[]>([]);
  const [quoteDetails, setQuoteDetails] = useState<QuoteDetail[]>([]);
  const [openSection, setOpenSection] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { list } = await fetchCustomerMovingRequests();
        setExpiredRequests(list);
      } catch (error) {
        console.error("Error fetching expired requests:", error);
        setError("만료된 요청을 불러오는데 실패했습니다.");
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = async (requestId: number, code: number) => {
    try {
      setLoading(true);
      const response = await fetchRequestQuotes(
        requestId,
        code === CONFIRMED_QUOTE
      );
      const quotes: Quote[] = response.list.map((quote: any) => ({
        ...quote,
        movingRequest: {
          id: quote.id,
          service: quote.movingRequest.service,
          movingDate: quote.movingDate,
          pickupAddress: quote.pickupAddress,
          dropOffAddress: quote.dropOffAddress,
          requestDate: quote.requestDate,
          isConfirmed: quote.isConfirmed,
          status: quote.status,
        },
      }));

      setQuoteDetails((prev) =>
        prev
          .filter((detail) => detail.id !== requestId)
          .concat({
            id: requestId,
            quotes,
            filterType: code,
          })
      );
    } catch (error) {
      console.error("Error fetching filtered quotes:", error);
      setError("견적서를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const toggleSection = async (id: number) => {
    if (openSection === id) {
      setOpenSection(null);
      return;
    }

    const existingQuotes = quoteDetails.find((detail) => detail.id === id);
    if (existingQuotes) {
      setOpenSection(id);
      return;
    }

    try {
      setLoading(true);
      const response = await fetchRequestQuotes(id, false); // 처음에는 항상 전체 견적서를 로드
      const quotes: Quote[] = response.list.map((quote: any) => ({
        ...quote,
        movingRequest: {
          id: quote.id,
          service: quote.movingRequest.service,
          movingDate: quote.movingDate,
          pickupAddress: quote.pickupAddress,
          dropOffAddress: quote.dropOffAddress,
          requestDate: quote.requestDate,
          isConfirmed: quote.isConfirmed,
          status: quote.status,
        },
      }));
      const newQuoteDetail: QuoteDetail = {
        id,
        quotes,
        filterType: ALL_QUOTE, // 초기 필터 타입은 '전체'로 설정
      };
      setQuoteDetails((prev) => [...prev, newQuoteDetail]);
      setOpenSection(id);
    } catch (error) {
      console.error("Error fetching request quotes:", error);
      setError("견적서를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const getQuotesForSection = (id: number) =>
    quoteDetails.find((detail) => detail.id === id)?.quotes || [];

  const mapQuoteToCardData = (quote: Quote) => ({
    quoteId: quote.id,
    id: quote.mover.id,
    nickname: quote.mover.nickname,
    career: quote.mover.career,
    isDesignated: quote.mover.isDesignated,
    rating: quote.mover.rating,
    reviewCount: quote.mover.rating.totalCount,
    cost: quote.cost,
    confirmCount: quote.mover.confirmCount,
    favoriteCount: quote.mover.favoriteCount,
    status: quote.movingRequest.status,
    pickupAddress: quote.movingRequest.pickupAddress,
    dropOffAddress: quote.movingRequest.dropOffAddress,
    movingDate: quote.movingRequest.movingDate,
    requestDate: quote.movingRequest.requestDate,
    movingType: quote.movingRequest.service,
    service: quote.movingRequest.service,
    isFavorite: quote.mover.isFavorite,
    imageUrl: quote.mover.imageUrl,
    introduction: quote.mover.introduction,
  });

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full mx-auto">
      {expiredRequests.length > 0 ? (
        <div className="flex flex-col gap-6">
          {expiredRequests.map((request) => (
            <div
              key={request.id}
              className="rounded-lg shadow-card border border-stone-200 overflow-hidden bg-white"
            >
              <div className="relative p-4">
                <div className="flex flex-row gap-6 pc:gap-12 p-3 pc:p-6 items-center">
                  <MovingIcon />
                  <RequestDetails request={request} />
                </div>

                <LineSeparator
                  direction="horizontal"
                  className="flex tablet:hidden"
                />
                <LineSeparator
                  direction="horizontal"
                  className="mb-2 mx-6 w-auto bg-gray-100"
                />

                <button
                  onClick={() => toggleSection(request.id)}
                  className="w-full px-6 py-1 text-left flex items-center gap-4 justify-center hover:bg-stone-50 transition-colors duration-200"
                  aria-expanded={openSection === request.id}
                >
                  <h2 className="text-lg font-semibold">견적서 보기</h2>
                  <ChevronDown
                    className={`text-pr-blue-300 transform transition-transform duration-300 ${
                      openSection === request.id ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`overflow-y-scroll transition-all duration-500 ease-in-out ${
                    openSection === request.id ? "max-h-[670px]" : "max-h-0"
                  }`}
                >
                  <div className="px-6 py-4 flex justify-between items-center border-t border-b border-gray-100">
                    <div className="text-gray-400 text-xl font-semibold">
                      견적서 보기
                    </div>
                    <QuoteFilterDropdown
                      onSelect={(code) => handleFilterChange(request.id, code)}
                      disabled={loading}
                      filterType={
                        quoteDetails.find((detail) => detail.id === request.id)
                          ?.filterType ?? ALL_QUOTE
                      }
                    />
                  </div>

                  <div className="p-4 grid gap-4">
                    {loading ? (
                      <div className="text-center py-4">로딩 중...</div>
                    ) : getQuotesForSection(request.id).length === 0 ? (
                      <div className="text-center py-4 text-gray-500">
                        견적서가 없습니다.
                      </div>
                    ) : (
                      getQuotesForSection(request.id).map((quote) => (
                        <ReceivedQuoteCard
                          key={quote.id}
                          data={mapQuoteToCardData(quote)}
                        />
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[200px] text-gray-500">
          받은 견적이 없습니다.
        </div>
      )}
    </div>
  );
};

export default ExpiredRequests;
