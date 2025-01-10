import FilterModal from "@/components/modals/FilterModal";
import NiceModal, { useModal } from "@ebay/nice-modal-react";

interface FilterModal_Props {
  serviceCounts: { houseMove: number; officeMove: number; smallMove: number };
  serviceFilters: boolean[];
  designateCounts: { total: number; designated: number };
  designateFilters: boolean[];
  onSubmit: (data: {
    newServiceStates: boolean[];
    newDesignateStates: boolean[];
  }) => void;
}

export function FilterModalComponent({
  serviceCounts,
  serviceFilters,
  designateCounts,
  designateFilters,
  onSubmit,
}: FilterModal_Props) {
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
        <FilterModal
          serviceCounts={serviceCounts}
          serviceFilters={serviceFilters}
          designateCounts={designateCounts}
          designateFilters={designateFilters}
          onSubmit={onSubmit}
          onClose={() => modal.remove()}
        />
      </div>
    </div>
  );
}

export const FilterNiceModal = NiceModal.create(FilterModalComponent);
