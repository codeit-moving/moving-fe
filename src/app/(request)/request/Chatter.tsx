"use client";

import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatField from "@/components/common/ChatField";
import DatePicker from "@/components/request/DatePicker";
import StepSelectionField from "./StepSelectionFiled";
import AddressSelectionField from "./AddressSelectionField";
import { movingRequests } from "@/api/movingRequest";
import { useQuoteProgress } from "@/context/QuoteProgressContext";
import { REGION_CODES, REGION_TEXTS } from "@/variables/regions";

// Types
interface Address {
  from: string;
  to: string;
}

interface Message {
  type: "user" | "bot" | "loading";
  text?: string;
}

interface EditButtonProps {
  onClick: () => void;
}

// Animation Variants
const chatBubbleVariants = {
  initial: { opacity: 0, y: 20, scale: 0.97 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
  exit: { opacity: 0, y: -10, scale: 0.97, transition: { duration: 0.4 } },
};

// Helper Components
const LoadingDots = () => (
  <div className="flex items-center gap-1">
    {Array.from({ length: 3 }).map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0.5, scale: 1 }}
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.5, 1] }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "easeInOut",
          delay: i * 0.2,
        }}
        className="w-2 h-2 rounded-full bg-gray-400"
      />
    ))}
  </div>
);

const EditButton = ({ onClick }: EditButtonProps) => (
  <button
    onClick={onClick}
    className="text-sm text-gray-400 hover:text-gray-600 mt-1"
  >
    수정하기
  </button>
);

// Utility Functions
const getRegionCode = (address: string): number => {
  const regionNames = Object.keys(REGION_TEXTS);
  for (const regionCode of regionNames) {
    const numericCode = Number(regionCode) as keyof typeof REGION_TEXTS;
    if (address.includes(REGION_TEXTS[numericCode])) {
      return Number(regionCode);
    }
  }
  return REGION_CODES.ALL;
};

const formatDateTime = (date: Date | null): string => {
  if (!date) return "";
  return `${date.getFullYear()}년 ${
    date.getMonth() + 1
  }월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분`;
};

const transformDataForPost = (data: {
  type: string;
  date: Date | null;
  addresses: Address;
}) => ({
  service: data.type === "소형이사" ? 1 : data.type === "가정이사" ? 2 : 3,
  movingDate: data.date ? data.date.toISOString() : new Date().toISOString(),
  pickupAddress: data.addresses.from,
  dropOffAddress: data.addresses.to,
  region: getRegionCode(data.addresses.from),
});

// Main Component
const EstimateRequest: React.FC = () => {
  const router = useRouter();
  const [type, setType] = useState<string>("");
  const [date, setDate] = useState<Date | null>(null);
  const [addresses, setAddresses] = useState<Address>({ from: "", to: "" });
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { step, setStep } = useQuoteProgress();

  useEffect(() => {
    const checkActiveRequest = async () => {
      try {
        const data = await movingRequests.checkActive();

        if (data.activeRequest) {
          setMessages([
            {
              type: "bot",
              text: "이미 진행 중인 견적 요청이 있습니다.",
            },
          ]);
          toast.error(data.message);
        } else {
          setMessages([
            {
              type: "bot",
              text: "몇 가지 정보만 알려주시면 최대 5개의 견적을 받을 수 있어요 😊",
            },
            { type: "bot", text: "이사 종류를 선택해 주세요." },
          ]);
        }
      } catch (error) {
        console.error("Error checking active request:", error);
        // 에러가 발생해도 견적 요청은 계속 진행할 수 있도록 함
        setMessages([
          {
            type: "bot",
            text: "몇 가지 정보만 알려주시면 최대 5개의 견적을 받을 수 있어요 😊",
          },
          { type: "bot", text: "이사 종류를 선택해 주세요." },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    checkActiveRequest();
  }, []);

  // Message Handlers
  const handleNextStep = (newMessages: Message[], delay = 500) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { type: "loading" }]);

    setTimeout(() => {
      setMessages((prev) => [...prev.slice(0, -1), ...newMessages]);
      setIsLoading(false);
      setStep(step + 1);
    }, delay);
  };

  // Step Handlers
  const handleTypeSelection = (selectedType: string) => {
    setType(selectedType);
    handleNextStep([
      { type: "user", text: selectedType },
      { type: "bot", text: "이사 예정일을 선택해주세요." },
    ]);
  };

  const handleDateComplete = (isoString: string) => {
    const selectedDate = new Date(isoString);
    setDate(selectedDate);
    handleNextStep([
      { type: "user", text: formatDateTime(selectedDate) },
      { type: "bot", text: "이사 지역을 선택해주세요." },
    ]);
  };

  const handleAddressSelection = (fromAddr: string, toAddr: string) => {
    setAddresses({ from: fromAddr, to: toAddr });
  };

  const handleSubmit = async () => {
    try {
      const activeCheck = await movingRequests.checkActive();

      if (activeCheck.activeRequest) {
        toast.error(activeCheck.message);
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            text: "이미 진행 중인 견적 요청이 있어 새로운 견적을 요청할 수 없습니다.",
          },
        ]);
        return;
      }

      const postData = transformDataForPost({ type, date, addresses });
      await movingRequests.create(postData);
      toast.success("견적 요청이 완료되었습니다!");

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      if (error instanceof Error && error.message === "ACTIVE_REQUEST_EXISTS") {
        toast.error("이미 진행 중인 견적 요청이 있습니다.");
      } else {
        toast.error("요청 처리 중 문제가 발생했습니다.");
        console.error("Moving request error:", error);
      }
    }
  };

  const handleEdit = (editStep: number) => {
    setStep(editStep);
    const stepMessages = {
      0: "이사 종류를 선택해 주세요.",
      1: "이사 예정일을 선택해주세요.",
      2: "이사 지역을 선택해주세요.",
    };

    setMessages((prev) => {
      const stepIndex = prev.findIndex(
        (m) => m.text === stepMessages[editStep as keyof typeof stepMessages]
      );
      const messages = prev.slice(0, stepIndex >= 0 ? stepIndex : 2);
      if (stepMessages[editStep as keyof typeof stepMessages]) {
        messages.push({
          type: "bot",
          text: stepMessages[editStep as keyof typeof stepMessages],
        });
      }
      return messages;
    });

    if (editStep <= 0) setType("");
    if (editStep <= 1) setDate(null);
    if (editStep <= 2) setAddresses({ from: "", to: "" });
  };

  // Render Step Content
  const renderStepContent = () => {
    if (step === 0) {
      return (
        <StepSelectionField
          type="custom"
          options={[
            {
              text: "소형이사 (원룸, 투룸, 20평대 미만)",
              value: "소형이사",
            },
            {
              text: "가정이사 (쓰리룸, 20평대 이상)",
              value: "가정이사",
            },
            {
              text: "사무실이사 (사무실, 상업공간)",
              value: "사무실이사",
            },
          ]}
          onSelect={handleTypeSelection}
        />
      );
    }

    if (step === 1) {
      return <DatePicker onChange={() => {}} onComplete={handleDateComplete} />;
    }

    if (step === 2) {
      return (
        <div className="flex flex-col gap-4">
          <AddressSelectionField
            type="custom"
            onSelect={handleAddressSelection}
          />
          {addresses.from && addresses.to && (
            <button
              onClick={handleSubmit}
              className="w-full py-4 bg-pr-blue-300 text-white font-semibold rounded-2xl hover:bg-pr-blue-200"
            >
              견적 확정하기
            </button>
          )}
        </div>
      );
    }
  };

  return (
    <div className="w-full pb-4">
      <div className="my-4 space-y-4">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={`message-${index}`}
              variants={chatBubbleVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div className="flex flex-col">
                <div
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <ChatField
                    value={
                      message.type === "loading" ? (
                        <LoadingDots />
                      ) : (
                        message.text || ""
                      )
                    }
                    variant={message.type === "user" ? "primary" : "default"}
                    type={message.type === "user" ? "custom" : "admin"}
                    radius="24px"
                  />
                </div>
                {message.type === "user" && !isLoading && (
                  <div className="flex justify-end">
                    {message.text === type && (
                      <EditButton onClick={() => handleEdit(0)} />
                    )}
                    {message.text === formatDateTime(date) && (
                      <EditButton onClick={() => handleEdit(1)} />
                    )}
                    {message.text?.includes("출발지:") && (
                      <EditButton onClick={() => handleEdit(2)} />
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Only show step content if there's no active request */}
        <AnimatePresence mode="wait">
          {messages[messages.length - 1]?.type === "bot" &&
            !isLoading &&
            !messages[0]?.text?.includes(
              "이미 진행 중인 견적 요청이 있습니다"
            ) && (
              <motion.div
                key={`step-${step}`}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={chatBubbleVariants}
              >
                <div className="flex justify-end">{renderStepContent()}</div>
              </motion.div>
            )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EstimateRequest;
