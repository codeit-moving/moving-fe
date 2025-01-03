import React, { useCallback, useMemo } from "react";
import { ChevronLeft, ChevronRight, Clock, ArrowLeft } from "lucide-react";
import clsx from "clsx";

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"] as const;
const DATE_STEP = "date" as const;
const TIME_STEP = "time" as const;
type Step = typeof DATE_STEP | typeof TIME_STEP;

interface DayInfo {
  date: number;
  isCurrentMonth?: boolean;
  isPrevMonth?: boolean;
  isNextMonth?: boolean;
  isDisabled?: boolean;
}

interface DatePickerProps {
  onChange: (isoString: string) => void;
  onComplete?: (isoString: string) => void;
  initialDate?: Date;
}

/**
 * `DatePicker` 컴포넌트는 날짜와 시간을 선택할 수 있는 UI를 제공합니다.
 * 날짜를 선택하고, 시간도 함께 선택할 수 있으며, 최종적으로 선택된 날짜와 시간이 ISO 8601 형식으로 반환됩니다.
 *
 * @component
 * @example
 * // 기본 사용 예시
 * <DatePicker onChange={(isoString) => console.log(isoString)} />
 *
 * @param {Object} props
 * @param {Function} [props.onChange] - 선택된 날짜와 시간이 ISO 8601 형식으로 반환됩니다
 * @param {Date} [props.initialDate] - 초기 선택 날짜. 기본값은 현재 날짜
 *
 * @returns {JSX.Element} 선택할 수 있는 날짜와 시간이 포함된 UI
 */
const DatePicker: React.FC<DatePickerProps> = ({
  onChange,
  onComplete,
  initialDate = new Date(),
}) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // 시간을 00:00:00으로 설정하여 날짜만 비교

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1); // 기본값을 내일로 설정

  const [currentDate, setCurrentDate] = React.useState(
    () => new Date(tomorrow)
  );
  const [selectedDate, setSelectedDate] = React.useState(
    () => new Date(tomorrow)
  );
  const [step, setStep] = React.useState<Step>(DATE_STEP);
  const [selectedTime, setSelectedTime] = React.useState({
    hours: tomorrow.getHours(),
    minutes: tomorrow.getMinutes(),
  });

  // 선택할 수 있는 날짜인지 확인하는 함수
  const isDisabled = (day: DayInfo): boolean => {
    const selectedDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day.date
    );
    selectedDay.setHours(0, 0, 0, 0);
    return selectedDay < tomorrow;
  };

  const getDaysInMonth = React.useCallback((date: Date): DayInfo[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    const prevMonthLastDay = new Date(year, month, 0).getDate();

    const today = new Date();
    today.setHours(0, 0, 0, 0); // 오늘 날짜의 00:00로 초기화
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // 내일 날짜로 설정

    return [
      ...Array.from({ length: startingDay }, (_, i) => ({
        date: prevMonthLastDay - (startingDay - 1) + i,
        isPrevMonth: true,
      })),
      ...Array.from({ length: daysInMonth }, (_, i) => {
        const dayDate = new Date(year, month, i + 1);
        const isDisabled = dayDate < tomorrow; // 내일 날짜 이전은 비활성화
        return {
          date: i + 1,
          isCurrentMonth: true,
          isDisabled, // 내일 이전 날짜는 비활성화
        };
      }),
      ...Array.from({ length: 42 - (startingDay + daysInMonth) }, (_, i) => ({
        date: i + 1,
        isNextMonth: true,
      })),
    ];
  }, []);

  const formatDate = useCallback((date: Date): string => {
    return date
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\./g, ". ")
      .trim();
  }, []);

  const formatYearMonth = React.useCallback((date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${year}. ${month}`;
  }, []);

  const isSelectedDate = React.useCallback(
    (day: DayInfo): boolean => {
      return Boolean(
        day.isCurrentMonth &&
          selectedDate.getDate() === day.date &&
          selectedDate.getMonth() === currentDate.getMonth() &&
          selectedDate.getFullYear() === currentDate.getFullYear()
      );
    },
    [selectedDate, currentDate]
  );

  const handleDateSelection = useCallback(
    (day: DayInfo) => {
      if (day.isCurrentMonth && !isDisabled(day)) {
        // 비활성화된 날짜는 선택하지 않도록
        const newDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          day.date,
          selectedTime.hours,
          selectedTime.minutes
        );
        setSelectedDate(newDate);
        onChange?.(newDate.toISOString());
      }
    },
    [currentDate, selectedTime, onChange]
  );

  const handleTimeSelection = () => {
    const newDate = new Date(selectedDate);
    newDate.setHours(selectedTime.hours);
    newDate.setMinutes(selectedTime.minutes);
    setSelectedDate(newDate);
    const isoString = newDate.toISOString();
    onChange?.(isoString);
    onComplete?.(isoString);
  };

  const navigateMonth = (direction: number) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const DatePickerHeader = React.memo(() => (
    <div className="flex items-center justify-between mb-6">
      <button
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        onClick={() => navigateMonth(-1)}
        aria-label="Previous month"
      >
        <ChevronLeft className="h-6 w-6 text-gray-600" />
      </button>
      <h2 className="text-xl font-semibold">{formatYearMonth(currentDate)}</h2>
      <button
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        onClick={() => navigateMonth(1)}
        aria-label="Next month"
      >
        <ChevronRight className="h-6 w-6 text-gray-600" />
      </button>
    </div>
  ));

  const TimePickerHeader = () => (
    <div className="flex items-center mb-6">
      <button
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        onClick={() => setStep(DATE_STEP)}
        aria-label="Back to date selection"
      >
        <ArrowLeft className="h-6 w-6 text-gray-600" />
      </button>
      <h2 className="text-xl font-medium flex items-center ml-2">
        <Clock className="w-6 h-6 mr-2" />
        {formatDate(selectedDate)}
      </h2>
    </div>
  );
  const DateGrid = React.memo(() => {
    const days = getDaysInMonth(currentDate);

    return (
      <div className="flex flex-col items-center w-full">
        <div className="grid grid-cols-7 gap-4 place-items-center w-full px-4">
          {WEEKDAYS.map((day, index) => (
            <div
              key={`weekday-${index}`}
              className="flex items-center justify-center text-gray-500 text-sm py-2 w-10"
            >
              {day}
            </div>
          ))}

          {days.map((day, index) => {
            const isSelected = isSelectedDate(day);
            const disabled = isDisabled(day); // 날짜가 비활성화됐는지 확인
            return (
              <button
                key={`day-${index}`}
                onClick={() => handleDateSelection(day)}
                className={clsx(
                  "h-10 w-10 rounded-full",
                  "flex items-center justify-center",
                  "transition-colors duration-200",
                  !day.isCurrentMonth && "text-gray-300",
                  day.isCurrentMonth && "text-black hover:bg-gray-100",
                  isSelected && "bg-blue-500 text-white hover:bg-blue-500",
                  disabled && " text-gray-300 cursor-not-allowed" // 비활성화된 날짜 스타일
                )}
                disabled={disabled} // 비활성화된 날짜는 클릭되지 않도록
              >
                {day.date}
              </button>
            );
          })}
        </div>
      </div>
    );
  });

  const timePickerOptions = useMemo(
    () => [
      {
        label: "시",
        value: selectedTime.hours,
        max: 24,
        setter: (v: number) =>
          setSelectedTime((prev) => ({ ...prev, hours: v })),
      },
      {
        label: "분",
        value: selectedTime.minutes,
        max: 60,
        setter: (v: number) =>
          setSelectedTime((prev) => ({ ...prev, minutes: v })),
      },
    ],
    [selectedTime]
  );

  const handleButtonClick = useCallback(() => {
    if (step === DATE_STEP) {
      setStep(TIME_STEP);
    } else {
      handleTimeSelection();
    }
  }, [step, handleTimeSelection]);

  DatePickerHeader.displayName = "DatePickerHeader";
  DateGrid.displayName = "DateGrid";

  return (
    <div className="w-[327px] tablet:w-[400px] pc:w-[640px] bg-white rounded-[32px] rounded-tr-none shadow-lg">
      <div className="px-4 tablet:px-6 pc:px-8 py-4 tablet:py-5 pc:py-6">
        <div className="transition-all duration-300 ease-in-out">
          {step === DATE_STEP ? (
            <>
              <DatePickerHeader />
              <DateGrid />
            </>
          ) : (
            <>
              <TimePickerHeader />
              <div className="flex justify-center gap-4 tablet:gap-6 pc:gap-8 mb-6 tablet:mb-7 pc:mb-8">
                {timePickerOptions.map(({ label, value, max, setter }) => (
                  <div key={label} className="w-16 tablet:w-20 pc:w-24">
                    <label className="block text-gray-500 text-center mb-2">
                      {label}
                    </label>
                    <select
                      value={value}
                      onChange={(e) => setter(parseInt(e.target.value))}
                      className="w-full p-2 rounded-lg border border-gray-200 text-center appearance-none bg-white hover:border-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {Array.from({ length: max }, (_, i) => (
                        <option key={i} value={i}>
                          {String(i).padStart(2, "0")}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <button
          className="w-full mt-6 py-4 px-6 bg-pr-blue-300 text-white rounded-[16px] text-xl font-semibold hover:bg-pr-blue-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={handleButtonClick}
        >
          {step === DATE_STEP ? "시간 선택" : "선택완료"}
        </button>
      </div>
    </div>
  );
};

export default DatePicker;
