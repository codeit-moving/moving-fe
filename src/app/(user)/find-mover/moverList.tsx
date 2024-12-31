"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";

import Input from "@/components/common/Input";
import MoverInfoCard from "@/components/cards/MoverInfoCard";
import LoadingDots from "@/components/LoadingDots";
import DropdownRegion from "@/components/dropdowns/DropdownRegion";
import DropdownService from "@/components/dropdowns/DropdownService";
import DropdownSortMovingRequest from "@/components/dropdowns/DropdownSortMovingRequest";
import { GetMoverListResponseData } from "@/api/mover";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { getMoverList } from "@/api/mover";
import ScrollIndicator from "@/components/ScrollIndicator";
import { useUserStore } from "@/store/userStore";

import assets from "@/variables/images";
import {
  MOVER_DEFAULT_PAGE_SIZE,
  FAVORITE_MOVER_DEFAULT_PAGE_SIZE,
} from "@/variables/mover";

interface FavoriteMoverListProps {
  userRole: "MOVER" | "USER" | null;
}

function FavoriteMoverList({ userRole }: FavoriteMoverListProps) {
  const styles = {
    container: "w-full",
    title: `flex flex-row items-center text-xl text-black-400 font-semibold 
      pc:h-[32px]`,
    listContainer: `flex flex-col gap-4 
      pc:mt-[16px] pc:w-full`,
  };

  let favoriteMoverInfos = undefined;

  useEffect(() => {
    if (userRole === "USER") {
      favoriteMoverInfos = getMoverList({
        order: "recent",
        limit: FAVORITE_MOVER_DEFAULT_PAGE_SIZE,
        nextCursorId: null,
      }).then((data) =>
        data.list.map((mover) => {
          return (
            <MoverInfoCard
              key={`${mover.id}`}
              data={mover}
              size="fixed"
              className=""
            />
          );
        })
      );
    }
  }, [userRole]);

  if (userRole !== "USER") {
    return undefined;
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>찜한 기사님</div>
      <div className={styles.listContainer}>{favoriteMoverInfos}</div>
    </div>
  );
}

interface FilterProps {
  onRegionChange: (newStates: number | null) => void;
  onServiceChange: (newStates: number | null) => void;
}

function Filter({ onRegionChange, onServiceChange }: FilterProps) {
  const [filterStates, setFilterStates] = useState<{
    region: number | null;
    service: number | null;
  }>({ region: null, service: null });

  const styles = {
    container: `
      pc:w-[328px] 
      pc:h-[340px]`,
    header: `
      flex flex-row items-center text-xl text-black font-medium justify-between 
      pc:px-[13.5px] pc:w-full pc:h-[64px]`,
    resetButton: `
      flex flex-row items-center text-lg text-grayscale-300 font-medium cursor-pointer 
      pc:h-[32px]`,
    sectionTitle: `
      flex flex-row items-center text-2lg text-black-400 font-semibold 
      pc:mt-[10px] pc:w-full pc:h-[64px]`,
  };

  const handleSelectRegion = (regionCode: number) => {
    setFilterStates((prev) => ({ ...prev, region: regionCode }));
    onRegionChange(regionCode);
  };

  const handleSelectService = (serviceCode: number) => {
    setFilterStates((prev) => ({ ...prev, service: serviceCode }));
    onServiceChange(serviceCode);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        필터
        <div className={styles.resetButton}>초기화</div>
      </div>
      <div className={styles.sectionTitle}>지역을 선택해주세요</div>
      <DropdownRegion onSelect={handleSelectRegion} disabled={false} />
      <div className={styles.sectionTitle}>어떤 서비스가 필요하세요?</div>
      <DropdownService onSelect={handleSelectService} disabled={false} />
    </div>
  );
}

interface FormState {
  keyword: string;
  currentServiceFilter: number | null;
  currentRegionFilter: number | null;
  orderBy: "recent" | "movingDate";
}

interface MoverListWithFiltersProps {
  initialData: GetMoverListResponseData;
}

export default function MoverListWithFilters({
  initialData,
}: MoverListWithFiltersProps) {
  const [formState, setFormState] = useState<FormState>({
    keyword: "",
    currentServiceFilter: null,
    currentRegionFilter: null,
    orderBy: "recent",
  });
  const [debouncedKeyword, setDebouncedKeyword] = useState(formState.keyword);
  const { userRole } = useUserStore();

  const loadMoreRef = useInfiniteScroll({
    callback: () => {
      if (hasNextPage) fetchNextPage();
    },
    options: { threshold: 0.5 },
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    useInfiniteQuery<
      GetMoverListResponseData,
      Error,
      InfiniteData<GetMoverListResponseData>,
      (
        | string
        | {
            keyword: string;
            currentServiceFilter: number | null;
            currentRegionFilter: number | null;
            orderBy: "recent" | "movingDate";
          }
      )[],
      number | null
    >({
      queryKey: ["moverList", formState],
      queryFn: ({ pageParam = null }) =>
        getMoverList({
          service: formState.currentServiceFilter,
          region: formState.currentRegionFilter,
          keyword: debouncedKeyword,
          order: formState.orderBy,
          limit: MOVER_DEFAULT_PAGE_SIZE,
          nextCursorId: pageParam,
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
    container: `flex flex-col items-center pc:w-full`,
    header: {
      container: `hidden w-full h-[54px] 
        pc:flex flex-row gap-2.5 items-center justify-center pc:h-[96px]`,
      text: `w-[328px] h-full text-2lg text-[#2b2b2b] font-semibold cursor-pointer 
        tablet:w-[600px] 
        pc:flex flex-row items-center pc:w-[1400px] pc:text-2xl`,
    },
    mainContent: `box-border flex 
      pc:flex-row justify-center gap-[117px] pc:mt-6`,
    filter: {
      container: `box-border w-[328px] hidden 
        tablet:hidden 
        pc:flex pc:flex-col pc:gap-[46px]`,
    },
    moverList: {
      container: `box-border flex flex-col w-[328px] 
        tablet:w-[600px] 
        pc:w-[955px]`,
      sortContainer: `flex flex-row items-center justify-between h-[68px] 
        pc:h-[40px] pc:justify-end`,
      dropdownContainer: `flex flex-row gap-3 pc:hidden`,
    },
    searchBar: {
      container: `relative flex items-center px-0 py-3 w-full h-[76px] 
        tablet:px-2.5 tablet:py-1.5 
        pc:mt-6 pc:p-0 pc:h-[64px]`,
      input: `w-full pl-[46px] 
        pc:pl-[68px]`,
      icon: `absolute left-[16px] w-6 h-6 
        pc:left-6 pc:w-9 pc:h-9`,
    },
    listContainer: `flex flex-col w-full mt-3 gap-[24px] 
      tablet:gap-[32px] tablet:mt-4 
      pc:mt-[32px] pc:gap-[48px]`,
  };

  const moverInfos = data?.pages
    ?.flatMap((page) => page.list)
    ?.map((mover) => (
      <MoverInfoCard
        key={`moverList-${mover.id}`}
        data={mover}
        size="responsive"
        className=""
      />
    ));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormState((prev) => ({
      ...prev,
      keyword: value,
    }));
  };

  const handleServiceFilterChange = (newService: number | null) => {
    if (newService === 99) {
      newService = null;
    }

    setFormState((prev) => ({
      ...prev,
      currentServiceFilter: newService,
    }));
  };

  const handleRegionFilterChange = (newRegion: number | null) => {
    if (newRegion === 82) {
      newRegion = null;
    }

    setFormState((prev) => ({
      ...prev,
      currentRegionFilter: newRegion,
    }));
  };

  const handleSortChange = (newSort: number) => {
    const sorts = ["recent", "movingDate"];

    setFormState((prev) => ({
      ...prev,
      currentSort: sorts[newSort],
    }));
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKeyword(formState.keyword);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [formState.keyword]);

  return (
    <div className={styles.container}>
      <div className={styles.header.container}>
        <div className={styles.header.text}>기사님 찾기</div>
      </div>
      <div className={styles.mainContent}>
        <div className={styles.filter.container}>
          <Filter
            onRegionChange={handleRegionFilterChange}
            onServiceChange={handleServiceFilterChange}
          />
          <FavoriteMoverList userRole={userRole} />
        </div>
        <div className={styles.moverList.container}>
          <div className={styles.moverList.sortContainer}>
            <div className={styles.moverList.dropdownContainer}>
              <DropdownRegion
                onSelect={handleRegionFilterChange}
                disabled={false}
              />
              <DropdownService
                onSelect={handleServiceFilterChange}
                disabled={false}
              />
            </div>
            <DropdownSortMovingRequest
              onSelect={handleSortChange}
              disabled={false}
            />
          </div>
          <div className={styles.searchBar.container}>
            <Input
              name="searchKeyword"
              placeholder="텍스트를 입력해 주세요."
              className={styles.searchBar.input}
              value={formState.keyword}
              onChange={handleInputChange}
            />
            <div className={styles.searchBar.icon}>
              <Image src={assets.icons.search} alt="검색" fill />
            </div>
          </div>
          <div className={styles.listContainer}>
            {isFetching && <LoadingDots />}
            {moverInfos}
            <div ref={loadMoreRef} className="h-20 bg-transparent"></div>
            {isFetchingNextPage && <LoadingDots />}
            {hasNextPage && <ScrollIndicator />}
          </div>
        </div>
      </div>
    </div>
  );
}
