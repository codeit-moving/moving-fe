import React, { useState } from "react";
import DaumPostcode from "react-daum-postcode";
import { X } from "lucide-react";

interface AddressSelectionFieldProps {
  type?: "custom" | "admin";
  radius?: string;
  onSelect: (fromAddress: string, toAddress: string) => void;
}

export default function AddressSelectionField({
  type = "admin",
  radius = "24px",
  onSelect,
}: AddressSelectionFieldProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentType, setCurrentType] = useState<"from" | "to">("from");
  const [addresses, setAddresses] = useState({ from: "", to: "" });
  const [detailAddress, setDetailAddress] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");

  const handleComplete = (data: any) => {
    const fullAddress = data.address;
    const extraAddress = data.buildingName ? ` (${data.buildingName})` : "";
    setSelectedAddress(fullAddress + extraAddress);
  };

  const handleDetailAddressSubmit = () => {
    const finalAddress = `${selectedAddress} ${detailAddress}`;
    setAddresses((prev) => ({
      ...prev,
      [currentType]: finalAddress,
    }));
    onSelect(
      currentType === "from" ? finalAddress : addresses.from,
      currentType === "to" ? finalAddress : addresses.to
    );
    setIsModalOpen(false);
    setDetailAddress("");
    setSelectedAddress("");
  };

  return (
    <>
      <div
        style={{
          display: "inline-block",
          boxShadow: "2px 2px 8px 0px #E0E0E033",
          borderRadius: radius,
        }}
        className="bg-white p-6 space-y-4"
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div className="font-medium">출발지</div>
            <input
              type="text"
              placeholder="출발지 선택하기"
              value={addresses.from}
              readOnly
              onClick={() => {
                setCurrentType("from");
                setIsModalOpen(true);
              }}
              className="w-540px text-pr-blue-300 p-4 border font-semibold border-solid rounded-2xl border-pr-blue-300 rounded-lg cursor-pointer hover:bg-pr-blue-50 text-md pc:text-2lg placeholder-pr-blue-300"
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="font-medium">도착지</div>
            <input
              type="text"
              placeholder="도착지 선택하기"
              value={addresses.to}
              readOnly
              onClick={() => {
                setCurrentType("to");
                setIsModalOpen(true);
              }}
              className="w-540px text-pr-blue-300 p-4 border font-semibold border-solid rounded-2xl border-pr-blue-300 rounded-lg cursor-pointer hover:bg-pr-blue-50 text-md pc:text-2lg placeholder-pr-blue-300"
            />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-[#141414] bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white px-8 py-6 rounded-[32px] w-full max-w-lg">
            <h3 className="text-2xl font-semibold mb-10 flex justify-between">
              <div>
                {currentType === "from" ? "출발지" : "도착지"}를 선택해주세요
              </div>
              <button onClick={() => setIsModalOpen(false)}>
                <X width={24} height={24} />
              </button>
            </h3>
            <DaumPostcode onComplete={handleComplete} autoClose={false} />
            {selectedAddress && (
              <div className="mt-4 space-y-4">
                <input
                  type="text"
                  value={selectedAddress}
                  readOnly
                  className="w-full p-4 border-[1px] rounded-lg outline-none bg-gray-100"
                />
                <input
                  type="text"
                  value={detailAddress}
                  onChange={(e) => setDetailAddress(e.target.value)}
                  placeholder="상세주소를 입력해주세요"
                  className="w-full p-4 rounded-lg border-[1px] outline-none"
                />
                <button
                  onClick={handleDetailAddressSubmit}
                  className="w-full p-4 bg-pr-blue-300 hover:bg-pr-blue-200 text-white rounded-lg"
                >
                  주소 선택 완료
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
