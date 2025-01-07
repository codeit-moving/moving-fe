"use client";

import { useState, useMemo } from "react";
import Image from "next/image";

import Button from "../common/Button";
import Checkbox from "../common/checkboxs/Checkbox";
import cn from "@/config/cn";
import { getServiceText } from "@/utils/utilFunctions";

import { SERVICE_CODES } from "@/variables/service";
import assets from "@/variables/images";

const SERVICE_FILTER: number = 0;
const DESIGNATE_FILTER: number = 1;

const allTrue = (arr: boolean[]): boolean => arr.every((item) => item);

interface FilterModalProps {
  serviceCounts: { houseMove: number; officeMove: number; smallMove: number };
  serviceFilters: boolean[];
  designateCounts: { total: number; designated: number };
  designateFilters: boolean[];
  onSubmit: (data: {
    newServiceStates: boolean[];
    newDesignateStates: boolean[];
  }) => void;
  onClose: () => void;
}

export default function FilterModal({
  serviceCounts,
  serviceFilters,
  designateCounts,
  designateFilters,
  onSubmit,
  onClose,
}: FilterModalProps) {
  const [newServiceStates, setNewServiceStates] = useState(() => [
    ...serviceFilters,
  ]);
  const [newDesignateStates, setNewDesignateStates] = useState(() => [
    ...designateFilters,
  ]);
  const allServiceChecked = useMemo(
    () => allTrue(newServiceStates),
    [newServiceStates]
  );
  const allDesignateChecked = useMemo(
    () => allTrue(newDesignateStates),
    [newDesignateStates]
  );
  const [type, setType] = useState<number>(SERVICE_FILTER);
  const totalServiceCounts = Object.values(serviceCounts).reduce(
    (sum, value) => sum + value,
    0
  );
  const arrServiceCounts = Object.entries(serviceCounts);
  const arrDesignateCounts = [
    designateCounts.total - designateCounts.designated,
    designateCounts.designated,
  ];

  const handleClickType = (type: number) => {
    setType(type);
  };

  const setServices = (newStates: boolean[]) => {
    setNewServiceStates(newStates);
  };

  const handleServiceItemCheckClick =
    (index: number) => (newState: boolean) => {
      setNewServiceStates((prev) => {
        const updatedStates = [...prev];
        updatedStates[index] = newState;
        return updatedStates;
      });
    };

  const handleAllServiceCheckClick = (newState: boolean) => {
    const updatedStates = newServiceStates.map(() => newState);
    setServices(updatedStates);
  };

  const setDesignates = (newStates: boolean[]) => {
    setNewDesignateStates(newStates);
  };

  const handleDesignateItemCheckClick =
    (index: number) => (newState: boolean) => {
      setNewDesignateStates((prev) => {
        const updatedStates = [...prev];
        updatedStates[index] = newState;
        return updatedStates;
      });
    };

  const handleAllDesignateCheckClick = (newState: boolean) => {
    const updatedStates = newDesignateStates.map(() => newState);
    setDesignates(updatedStates);
  };

  const styles = {
    container: `flex flex-col gap-[16px] px-[24px] pt-[16px] pb-[32px] bg-white
      w-[100%] rounded-t-[32px]
      tablet:w-[375px] tablet:rounded-[32px]`,
    base: `flex flex-row items-center justify-between h-[68px]
      border-solid border-b-[1px] border-b-line-200 text-black-400 font-medium`,
    typeLabel:
      "flex flex-row items-center justify-between mb-3 h-[42px] text-2lg font-semibold",
    item: "text-lg text-black-400",
    allSelect: "mb-2 h-[52px] text-lg text-grayscale-300",
  };

  const filterTypeLabelClass = cn(styles.typeLabel);
  const filterItemClass = cn(styles.base, styles.item);
  const filterAllSelectClass = cn(styles.base, styles.allSelect);

  const serviceFilterTexts = [
    {
      text: getServiceText(SERVICE_CODES.MOVE_SMALL),
      index: SERVICE_CODES.MOVE_SMALL,
    },
    {
      text: getServiceText(SERVICE_CODES.MOVE_HOME),
      index: SERVICE_CODES.MOVE_HOME,
    },
    {
      text: getServiceText(SERVICE_CODES.MOVE_OFFICE),
      index: SERVICE_CODES.MOVE_OFFICE,
    },
  ];

  const DesignatefilterTexts = [
    {
      text: "미지정 견적 요청",
      index: 0,
    },
    {
      text: "지정 견적 요청",
      index: 1,
    },
  ];

  const handleClick = () => {
    onSubmit({ newServiceStates, newDesignateStates });
    onClose();
  };

  return (
    <div className={styles.container}>
      <div className={filterTypeLabelClass}>
        <div className="flex flex-row items-center h-full gap-6">
          <p
            onClick={() => handleClickType(SERVICE_FILTER)}
            className={cn(
              "cursor-pointer",
              type === SERVICE_FILTER ? "text-black-400" : "text-grayscale-300"
            )}
          >
            이사 유형
          </p>
          <p
            onClick={() => handleClickType(DESIGNATE_FILTER)}
            className={cn(
              "cursor-pointer",
              type === DESIGNATE_FILTER
                ? "text-black-400"
                : "text-grayscale-300"
            )}
          >
            지정 여부
          </p>
        </div>
        <div className="relative w-6 h-6 cursor-pointer" onClick={onClose}>
          <Image src={assets.icons.x} alt="close" fill />
        </div>
      </div>
      <div>
        {type === SERVICE_FILTER ? (
          <div className="w-full h-[228px]">
            <div className={filterAllSelectClass}>
              {`전체선택 (${totalServiceCounts})`}
              <Checkbox
                state={allServiceChecked}
                onStateChange={handleAllServiceCheckClick}
              />
            </div>
            {arrServiceCounts.map((item, index) => (
              <div className={filterItemClass} key={index}>
                {`${serviceFilterTexts[index].text} (${item[1]})`}
                <Checkbox
                  state={newServiceStates[index]}
                  onStateChange={handleServiceItemCheckClick(index)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full h-[228px]">
            <div className={filterAllSelectClass}>
              {`전체선택 (${designateCounts.total})`}
              <Checkbox
                state={allDesignateChecked}
                onStateChange={handleAllDesignateCheckClick}
              />
            </div>
            {arrDesignateCounts.map((item, index) => (
              <div className={filterItemClass} key={index}>
                {`${DesignatefilterTexts[index].text} (${item})`}
                <Checkbox
                  state={newDesignateStates[index]}
                  onStateChange={handleDesignateItemCheckClick(index)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <Button
        width="100%"
        onClick={handleClick}
        children="조회하기"
        variant="primary"
        disabled={false}
        className="mt-[24px]"
      />
    </div>
  );
}
