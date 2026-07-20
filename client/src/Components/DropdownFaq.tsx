import { type FC, useState } from 'react';

import { MdKeyboardArrowLeft } from 'react-icons/md';

interface QuestionType {
  question: {
    id: number;
    question: string;
    answer: string;
  };
}

const DropdownFaq: FC<QuestionType> = ({ question }) => {
  const [openQuestion, setOpenQuestion] = useState(false);
  const handleClick = () => setOpenQuestion(!openQuestion);

  return (
    <div key={question.id} className="bg-grey relative p-5 shadow-md text-center">
      <span>{question.question}</span>
      <button
        onClick={handleClick}
        className={`ml-12 text-xl transition-transform ${
          openQuestion ? 'rotate-90' : '-rotate-90'
        } absolute right-6`}
      >
        <MdKeyboardArrowLeft />
      </button>
      <p className={`${openQuestion ? 'h-auto p-6' : 'h-0'} overflow-hidden`}>{question.answer}</p>
    </div>
  );
};

export default DropdownFaq;
