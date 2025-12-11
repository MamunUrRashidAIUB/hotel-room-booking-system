export interface Room {
  _id: string;
  roomNo: string;
  type: string;
  beds: number;
  pricePerNight: number;
  description?: string;
  available: boolean;
}
