export interface CustomerBooking {
  name: string;
  description: string;
  photo: string;
  start: Date;
  end: Date;
  hours: number;
  rate: number;
  status: string;
}

export interface CustomerBookingData {
  users?: CustomerBooking[];
  error?: { message: string };
}
