import NiceModal, { useModal } from "@ebay/nice-modal-react";

import CreateQuoteModal from "@/components/modals/CreateQuoteModal";

interface CreateQuoteModalProps {
  requestId: number;
  customerName: string;
  serviceType: number;
  isDesignatedQuote: boolean;
  startAddress: string;
  endAddress: string;
  moveDate: string;
  onSubmit: (quoteDate: {
    movingRequestId: number;
    cost?: number;
    comment: string;
  }) => void;
}

export function CreateQuoteModalComponent({
  requestId,
  customerName,
  serviceType,
  isDesignatedQuote,
  startAddress,
  endAddress,
  moveDate,
  onSubmit,
}: CreateQuoteModalProps) {
  const modal = useModal();

  const styles = {
    modalOverlay: `flex flex-col items-center justify-end 
            fixed inset-0 
            bg-[#141414] bg-opacity-50 
            tablet:justify-center 
            pc:justify-center`,
    modalContainer: `flex flex-col items-center justify-center 
            mx-auto w-full 
            tablet:w-[375px] 
            pc:w-[608px]`,
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <CreateQuoteModal
          requestId={requestId}
          customerName={customerName}
          serviceType={serviceType}
          isDesignatedQuote={isDesignatedQuote}
          startAddress={startAddress}
          endAddress={endAddress}
          moveDate={moveDate}
          onSubmit={onSubmit}
          onClose={() => modal.remove()}
        />
      </div>
    </div>
  );
}

export const CreateQuoteNiceModal = NiceModal.create(CreateQuoteModalComponent);
