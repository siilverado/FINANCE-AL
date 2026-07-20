export interface IReservation {
  start_hour: number;
  end_hour: number;
  userId: string;
}

export interface GetReservationType {
  id: string;
  hour: number;
  date: string;
  sportfield: {
    capacity: number;
    id: string;
    description: string;
    dimensions: string;
    fieldType: string;
    images: string[];
    name: string;
    sportsComplex: {
      address: string;
    };
  };
}
