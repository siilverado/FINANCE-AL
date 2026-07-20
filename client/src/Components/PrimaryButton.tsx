import { FC, ReactNode } from 'react';

interface Props {
  text: string;
  onClick?: () => void;
  children?: ReactNode;
  alternative?: boolean;
}

const PrimaryButton: FC<Props> = ({ text, onClick, alternative = false }) => {
  const handleClick = () => onClick && onClick();

  return (
    <button
      className={`${
        alternative ? 'bg-white text-[#000] border-primary' : 'bg-primary'
      } font-roboto py-3 px-5 font-semibold tracking-widest border-2 text-center text-[12px] min-w-[140px] shadow-lg rounded-full text-white`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
