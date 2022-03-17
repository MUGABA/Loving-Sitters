export interface Bookings {
  _id: string;
  name: string;
  start: string;
  status: string;
  photo: string;
}

export interface Request {
  _id: string;
  start: string;
  status: string;
  user: {
    photo: string;
    name: string;
  };
}

export interface RequestsList {
  requests: Request[];
  cancelled: Request[];
}

export interface CurrentList {
  requests: Request[];
}

export interface RequestItem {
  item: Request;
}
