import { useState, useEffect } from "react";

import Checkbox from "@/components/common/checkboxs/Checkbox";

import { getServiceText } from "@/utils/utilFunctions";
import cn from "@/config/cn";

import { SERVICE_CODES } from "@/variables/service";
import { LetterText } from "lucide-react";

const styles = {
  serviceContainer: "w-full h-[296px]",
  designateFilterContainer: "w-full h-[228px]",
  base: `flex flex-row items-center justify-between h-[68px] 
      border-solid border-b-[1px] border-b-line-200 
      text-black font-medium`,
  label: "mb-6 text-xl",
  item: "text-2lg",
  allSelect: `flex flex-row items-center gap-1 w-[103px] 
      text-2lg text-grayscale-300 font-regular`,
};

const allTrue = (arr: boolean[]): boolean => arr.every((item) => item);

interface ServiceFilterProps {
  serviceCounts: number[];
  onChange?: (newStates: boolean[]) => void;
}

export function ServiceFilter({ serviceCounts, onChange }: ServiceFilterProps) {
  const [serviceStates, setServiceStates] = useState<boolean[]>(
    serviceCounts.map(() => true)
  );
  const [allChecked, setAllChecked] = useState(allTrue(serviceStates));

  const handleItemCheckClick = (index: number) => (newState: boolean) => {
    const updatedStates = [...serviceStates];
    updatedStates[index] = newState;
    setServiceStates(updatedStates);
    onChange?.(updatedStates);
  };

  const handleAllCheckClick = (newState: boolean) => {
    const updatedStates = serviceStates.map(() => newState);
    setServiceStates(updatedStates);
    onChange?.(updatedStates);
  };

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

  useEffect(() => {
    setAllChecked(allTrue(serviceStates));
  }, [serviceStates]);

  return (
    <div className={styles.serviceContainer}>
      <div className={cn(styles.base, styles.label)}>
        이사 유형
        <div className={styles.allSelect}>
          <Checkbox state={allChecked} onStateChange={handleAllCheckClick} />
          전체선택
        </div>
      </div>
      {serviceCounts.map((item, index) => (
        <div className={cn(styles.base, styles.item)} key={index}>
          {`${serviceFilterTexts[index].text} (${item})`}
          <Checkbox
            state={serviceStates[index]}
            onStateChange={handleItemCheckClick(index)}
          />
        </div>
      ))}
    </div>
  );
}

interface DesignateFilterProps {
  designateCounts: number[];
  onChange?: (newStates: boolean[]) => void;
}

export function DesignateFilter({
  designateCounts,
  onChange,
}: DesignateFilterProps) {
  const [designateState, setDesignateState] = useState<boolean[]>([true, true]);

  const [allChecked, setAllChecked] = useState(allTrue(designateState));

  const handleItemCheckClick = (index: number) => (newState: boolean) => {
    const updatedStates = [...designateState];
    updatedStates[index] = newState;
    setDesignateState(updatedStates);
    onChange?.(updatedStates);
  };

  const handleAllCheckClick = (newState: boolean) => {
    const updatedStates = designateState.map(() => newState);
    setDesignateState(updatedStates);
    onChange?.(updatedStates);
  };

  const filterTexts = [
    {
      text: "미지정 견적 요청",
      index: 0,
    },
    {
      text: "지정 견적 요청",
      index: 1,
    },
  ];

  useEffect(() => {
    setAllChecked(allTrue(designateState));
  }, [designateState]);

  return (
    <div className={styles.designateFilterContainer}>
      <div className={cn(styles.base, styles.label)}>
        지정 여부
        <div className={styles.allSelect}>
          <Checkbox state={allChecked} onStateChange={handleAllCheckClick} />
          전체선택
        </div>
      </div>

      {filterTexts.map(({ text, index }) => (
        <div key={index} className={cn(styles.base, styles.item)}>
          {`${text} (${designateCounts[index]})`}
          <Checkbox
            state={designateState[index]}
            onStateChange={handleItemCheckClick(index)}
          />
        </div>
      ))}
    </div>
  );
}
