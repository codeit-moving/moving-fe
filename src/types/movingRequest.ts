export interface MovingRequestBaseData {
  id: number;
  name: string;
  service: number;
  movingDate: string;
  pickupAddress: string;
  dropOffAddress: string;
}

export interface MovingRequesteDataWithCreated extends MovingRequestBaseData {
  requestDate: string;
}

export interface MovingRequestDataWithComplete
  extends MovingRequesteDataWithCreated {
  isCompleted: boolean;
  isEstimateConfirmed: boolean;
}

export interface MovingRequestDataByMover extends MovingRequestBaseData {
  isCompleted: boolean;
  requestDate: string;
  isDesignated: boolean;
}
