export interface TurnType {
  id: string;
  name: string;
  fieldType: string;
  reservation: [
    {
      date: string;
      hour: number;
      id: string;
    },
  ];
  sportsComplex: {
    name: string;
  };
}
