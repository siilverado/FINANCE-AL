export interface TurnType {
  id: string;
  name: string;
  fieldType: string;
  reservation: [
    {
      date: string;
      hour: number;
      id: string;
      user: {
        firstName: string;
        lastName: string;
        email: string;
      };
    },
  ];
  sportsComplex: {
    name: string;
  };
}
