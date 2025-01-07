"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import {
  InfiniteData,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import Modal from "react-modal";
import NiceModal from "@ebay/nice-modal-react";
import { toast } from "react-hot-toast";

import IncomingRequestCard from "@/components/cards/IncomingRequestCard";
import Input from "@/components/common/Input";
import DropdownSortMovingRequest from "@/components/dropdowns/DropdownSortMovingRequest";
import { ServiceFilter, DesignateFilter } from "./filters";
import EmptyList from "@/components/EmptyList";
import ScrollIndicator from "@/components/ScrollIndicator";
import Loader from "@/components/common/Loader";
import { FilterNiceModal } from "./FilterNiceModal";
import { RejectRequetNiceModal } from "./RejectRequetNiceModal";
import { CreateQuoteNiceModal } from "./CreateQuoteNiceModal";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { isAllTrue } from "@/utils/utilFunctions";
import { createQuote, rejectMovingRequest } from "@/api/quote";

import assets from "@/variables/images";
import { type QuoteDetailsData } from "@/types/mover";

import { getMovingRequestListByMover } from "@/api/movingRequest";
import { type GetMovingRequestListByMoverResponseData } from "@/types/api";
import { MOVING_REQUEST_DEFAULT_PAGE_SIZE } from "@/variables/movingRequest";

NiceModal.register("FilterNiceModal", FilterNiceModal);
NiceModal.register("RejectRequetNiceModal", RejectRequetNiceModal);
NiceModal.register("CreateQuoteNiceModal", CreateQuoteNiceModal);

interface FormState {
  keyword: string;
  currentServiceFilter: boolean[];
  isDesignated: boolean | null;
  orderBy: "recent" | "movingDate";
}

interface RequestQuoteData extends QuoteDetailsData {
  id: number;
  isCompleted: boolean;
}

interface RequestFormProps {
  initialData: GetMovingRequestListByMoverResponseData;
}

export default function RequestForm({ initialData }: RequestFormProps) {
  const [formState, setFormState] = useState<FormState>({
    keyword: "",
    currentServiceFilter: [true, true, true],
    isDesignated: null,
    orderBy: "recent",
  });
  const [currentServiceFilterState, setCurrentServiceFilterState] = useState<
    boolean[]
  >([true, true, true]);
  const [requestState, setRequestState] = useState<boolean[]>([true, true]);
  const [debouncedKeyword, setDebouncedKeyword] = useState(formState.keyword);
  const queryClient = useQueryClient();

  const loadMoreRef = useInfiniteScroll({
    callback: () => {
      if (hasNextPage) fetchNextPage();
    },
    options: { threshold: 0.5 },
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    useInfiniteQuery<
      GetMovingRequestListByMoverResponseData,
      Error,
      InfiniteData<GetMovingRequestListByMoverResponseData>,
      (
        | string
        | {
            keyword: string;
            currentServiceFilter: boolean[];
            isDesignated: boolean | null;
            orderBy: "recent" | "movingDate";
          }
      )[],
      number | null
    >({
      queryKey: ["movingRequestList", formState],
      queryFn: ({ pageParam = "" }) =>
        getMovingRequestListByMover({
          smallMove: formState.currentServiceFilter[0],
          houseMove: formState.currentServiceFilter[1],
          officeMove: formState.currentServiceFilter[2],
          keyword: debouncedKeyword,
          isDesignated: formState.isDesignated,
          orderBy: formState.orderBy,
          limit: MOVING_REQUEST_DEFAULT_PAGE_SIZE,
          cursor: pageParam,
        }),
      getNextPageParam: (data) => {
        if (data.nextCursor === "") {
          return null;
        }

        const cursor = Number(data.nextCursor);
        return isNaN(cursor) ? null : cursor;
      },
      initialPageParam: null,
      initialData: {
        pages: [initialData],
        pageParams: [null],
      },
      staleTime: 0,
    });

  const styles = {
    container: `flex flex-col items-center 
      pc:w-full`,
    subContainer: `flex flex-col items-center 
      pc:max-w-[1400px] 
      w-full`,
    header: {
      container: `hidden w-full h-[54px] 
        pc:flex flex-row gap-2.5 items-center justify-center pc:h-[96px]`,
      text: `w-[328px] h-full text-2lg text-[#2b2b2b] font-semibold cursor-pointer 
        tablet:w-[600px] 
        pc:flex flex-row items-center pc:w-[1400px] pc:text-2xl`,
    },
    filterWrapper: `box-border flex flex-row w-full mt-4 
      tablet:mt-6 
      pc:justify-between  pc:mt-6`,
    sidebar: `box-border gap-6 w-[328px] hidden 
      tablet:hidden 
      pc:flex pc:flex-col`,
    gap: `w-[10px] hidden 
      tablet:hidden
      pc:block`,
    content: `box-border flex flex-col min-w-[328px] w-full 
    pc:w-[955px]`,
    searchWrapper: `relative flex items-center 
      px-0 py-3 
      w-full h-[76px] 
      tablet:px-2.5 tablet:py-3 
      pc:p-0 pc:h-[64px]`,
    searchInput: `w-full pl-[46px] 
      pc:pl-[68px]`,
    searchIcon: `absolute left-4 w-6 h-6 
      pc:left-6 pc:w-9 pc:h-9`,
    filterAndSort: `flex flex-row justify-between w-full h-[40px] px-[10px] py-1 
      pc:mt-6 pc:p-0`,
    itemCount: `flex flex-row items-center text-sm 
      pc:text-lg font-medium`,
    dropdownAndFilter: `flex flex-row gap-1`,
    filterIcon: `relative w-8 h-8 
      pc:hidden`,
    itemList: `flex flex-col gap-[32px] 
      mt-3 overflow-hidden w-full 
      tablet:mt-4 
      pc:mt-[32px] pc:gap-[48px]`,
  };

  const isListEmpty =
    !currentServiceFilterState.some(Boolean) || !requestState.some(Boolean);

  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKeyword(formState.keyword);
    }, 300);

    return () => clearTimeout(handler);
  }, [formState.keyword]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 }
    );

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);

    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [fetchNextPage, hasNextPage]);

  useEffect(() => {
    const isDesignated =
      !requestState[0] && requestState[1]
        ? true
        : requestState[0] && !requestState[1]
        ? false
        : null;

    setFormState((prev) => ({
      ...prev,
      currentServiceFilter: currentServiceFilterState,
      isDesignated,
    }));
  }, [currentServiceFilterState, requestState]);

  const handleAcceptRequest = (data: RequestQuoteData) => {
    NiceModal.show("CreateQuoteNiceModal", {
      requestId: data.id,
      serviceType: data.service,
      isDesignatedQuote: data.isDesignated,
      startAddress: data.pickupAddress,
      endAddress: data.dropOffAddress,
      moveDate: data.movingDate,
      customerName: data.name,
      onSubmit: submitQuote,
    });
  };

  const handleRejectRequest = (data: RequestQuoteData) => {
    NiceModal.show("RejectRequetNiceModal", {
      requestId: data.id,
      serviceType: data.service,
      isDesignatedQuote: data.isDesignated,
      startAddress: data.pickupAddress,
      endAddress: data.dropOffAddress,
      moveDate: data.movingDate,
      customerName: data.name,
      onSubmit: rejectRequest,
    });
  };

  const removeItemFromList = (requestId: number) => {
    queryClient.setQueryData<
      InfiniteData<GetMovingRequestListByMoverResponseData>
    >(["movingRequestList", formState], (oldData) => {
      if (!oldData) return oldData;

      const newPages = oldData.pages.map((page) => ({
        ...page,
        list: page.list.filter((item) => item.id !== requestId),
        requestCounts: {
          ...page.requestCounts,
          total: page.requestCounts.total - 1,
        },
      }));

      return {
        ...oldData,
        pages: newPages,
      };
    });
  };

  const submitQuote = async (quoteData: {
    movingRequestId: number;
    cost: number;
    comment: string;
  }) => {
    try {
      await createQuote(quoteData);
      removeItemFromList(quoteData.movingRequestId);
      toast.success("견적 보내기가 완료되었습니다!");
    } catch (err) {
      toast.error("견적 보내기에 실패했습니다. 다시 시도해주세요.");
    }

    return;
  };

  const rejectRequest = async (quoteData: {
    movingRequestId: number;
    comment: string;
  }) => {
    try {
      await rejectMovingRequest(quoteData);
      removeItemFromList(quoteData.movingRequestId);
      toast.success("견적 반려가 완료되었습니다!");
    } catch (err) {
      toast.error("견적 반려에 실패했습니다. 다시 시도해주세요.");
    }

    return;
  };

  const handleFilterIconClick = () => {
    const designateFilter =
      formState.isDesignated === null
        ? [true, true]
        : formState.isDesignated
        ? [false, true]
        : [true, false];

    NiceModal.show("FilterNiceModal", {
      serviceCounts: data?.pages[data.pages.length - 1]?.serviceCounts,
      serviceFilters: formState.currentServiceFilter,
      designateCounts: data?.pages[data.pages.length - 1]?.requestCounts,
      designateFilters: designateFilter,
      onSubmit: handleFindMovingRequestList,
    });
  };

  const handleFindMovingRequestList = (data: {
    newServiceStates: boolean[];
    newDesignateStates: boolean[];
  }) => {
    setFormState((prev) => ({
      ...prev,
      currentServiceFilter: data.newServiceStates,
      currentDesignateFilter: data.newDesignateStates,
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <div className={styles.header.container}>
          <div className={styles.header.text}>받은 요청</div>
        </div>
        <div className={styles.filterWrapper}>
          <div className={styles.sidebar}>
            <ServiceFilter
              serviceCounts={
                data
                  ? [
                      data.pages[data.pages.length - 1]?.serviceCounts
                        .smallMove,
                      data.pages[data.pages.length - 1]?.serviceCounts
                        .houseMove,
                      data.pages[data.pages.length - 1]?.serviceCounts
                        .officeMove,
                    ]
                  : [0, 0, 0]
              }
              onChange={(states) => setCurrentServiceFilterState(states)}
            />
            <DesignateFilter
              designateCounts={
                data
                  ? [
                      data.pages[data.pages.length - 1]?.requestCounts.total -
                        data.pages[data.pages.length - 1]?.requestCounts
                          .designated,
                      data.pages[data.pages.length - 1]?.requestCounts
                        .designated,
                    ]
                  : [0, 0]
              }
              onChange={(states) => setRequestState(states)}
            />
          </div>
          <div className={styles.gap}></div>
          <div className={styles.content}>
            <div className={styles.searchWrapper}>
              <Input
                name="searchKeyword"
                placeholder="어떤 고객님을 찾고 계세요?"
                className={styles.searchInput}
                value={formState.keyword}
                onChange={(e) =>
                  setFormState((prev) => ({ ...prev, keyword: e.target.value }))
                }
              />
              <div className={styles.searchIcon}>
                <Image src={assets.icons.search} alt="검색" fill />
              </div>
            </div>
            <div className={styles.filterAndSort}>
              <div className={styles.itemCount}>{`전체 ${
                data?.pages[data.pages.length - 1]?.requestCounts?.total || 0
              }건`}</div>
              <div className={styles.dropdownAndFilter}>
                <DropdownSortMovingRequest
                  onSelect={(sortIndex) =>
                    setFormState((prev) => ({
                      ...prev,
                      orderBy: ["recent", "movingDate"][sortIndex] as
                        | "recent"
                        | "movingDate",
                    }))
                  }
                  disabled={data?.pages[0].list.length === 0}
                />
                <div
                  className={styles.filterIcon}
                  onClick={handleFilterIconClick}
                >
                  <Image
                    src={
                      isAllTrue(formState.currentServiceFilter) &&
                      formState.isDesignated === null
                        ? assets.icons.filterInactive
                        : assets.icons.filterActive
                    }
                    alt="필터"
                    fill
                  />
                </div>
              </div>
            </div>
            <div className={styles.itemList}>
              {isListEmpty ? (
                <EmptyList text="조회된 이사 요청 정보가 없습니다" />
              ) : (
                data?.pages.map((page, i) =>
                  page.list.map((item, index) => (
                    <IncomingRequestCard
                      key={`${item.id}-${index}`}
                      data={item}
                      onPrimaryClick={handleAcceptRequest}
                      onOutlinedClick={handleRejectRequest}
                    />
                  ))
                )
              )}

              <div ref={loadMoreRef} className="h-20 bg-transparent"></div>
              {isFetchingNextPage && <Loader />}
              {!isListEmpty && hasNextPage && <ScrollIndicator />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
