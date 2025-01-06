import React from "react";
import CheckBoxButton from "@/components/request-checkbox-field/CheckboxButton";
import CheckboxField from "@/components/request-checkbox-field/CheckboxField";

interface StepSelectionFieldProps {
  options: Array<{
    text: string;
    value: string;
  }>;
  onSelect: (value: string) => void;
  type?: "custom" | "admin";
  radius?: string | number;
  disabled?: boolean; // 추가: 외부에서 disabled 상태를 제어할 수 있도록
}

const StepSelectionField: React.FC<StepSelectionFieldProps> = ({
  options,
  onSelect,
  type = "admin",
  radius = "24px",
  disabled = false, // 기본값 false
}) => {
  const [selectedValue, setSelectedValue] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const submitTimeoutRef = React.useRef<NodeJS.Timeout>(); // 타임아웃 ref 추가

  const borderRadiusStyles = {
    borderTopLeftRadius: type === "custom" ? radius : "0",
    borderTopRightRadius: type === "custom" ? "0" : radius,
    borderBottomRightRadius: radius,
    borderBottomLeftRadius: radius,
  };

  // 컴포넌트 언마운트 시 타임아웃 클리어
  React.useEffect(() => {
    return () => {
      if (submitTimeoutRef.current) {
        clearTimeout(submitTimeoutRef.current);
      }
    };
  }, []);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
  };

  const handleSubmit = async () => {
    if (selectedValue && !isSubmitting && !disabled) {
      setIsSubmitting(true);

      try {
        await onSelect(selectedValue);

        // 제출 후 일정 시간 동안 재제출 방지 (예: 1초)
        submitTimeoutRef.current = setTimeout(() => {
          setIsSubmitting(false);
        }, 1000);
      } catch (error) {
        setIsSubmitting(false);
        console.error("Submit error:", error);
      }
    }
  };

  return (
    <div
      style={{
        display: "inline-block",
        boxShadow: "2px 2px 8px 0px #E0E0E033",
        ...borderRadiusStyles,
      }}
      className="bg-white p-6 space-y-4"
      role="radiogroup"
    >
      {options.map((option) => (
        <CheckboxField
          key={option.value}
          text={option.text}
          value={option.value}
          isSelected={selectedValue === option.value}
          onSelect={handleSelect}
          disabled={isSubmitting || disabled}
        />
      ))}
      <CheckBoxButton
        variant="primary"
        onClick={handleSubmit}
        disabled={!selectedValue || isSubmitting || disabled}
        className="w-full mt-4"
      >
        {isSubmitting ? "처리중..." : "선택완료"}
      </CheckBoxButton>
    </div>
  );
};

export default StepSelectionField;
