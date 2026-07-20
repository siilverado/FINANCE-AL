interface QuestionType {
  id: number;
  question: string;
  answer: string;
}

export const questions: QuestionType[] = [
  {
    id: 1,
    question: 'No puedo reservar una cancha.',
    answer:
      'En caso que no hayas podido realizar la reserva de alguna cancha, te recomendamos que verifiques tus datos y si el mismo complejo cuenta con tus requerimientos.',
  },
  {
    id: 2,
    question: 'No encuentro el complejo.',
    answer:
      'Verifica que la ubicación del mismo sea la correcta. Te recomendamos hacer un buen uso de mayúsculas y comas.',
  },
  {
    id: 3,
    question: 'No puedo ingresar como propietario.',
    answer:
      'Verifica que tengas el formulario correspondiente en la sección de propietarios completo. En caso de haberlo realizado, verifica que los datos del mismo sean los correctos.',
  },
  {
    id: 4,
    question: 'No puedo cargar mi complejo.',
    answer:
      'Verifica que tu complejo cumpla con los requisitos necesarios para ingresarlo a All sport.',
  },
  {
    id: 5,
    question: 'Mas información',
    answer:
      'En caso que tu problema persista. Te recomendamos que te contactes con nosotros en Allsport@gmail.com',
  },
];
