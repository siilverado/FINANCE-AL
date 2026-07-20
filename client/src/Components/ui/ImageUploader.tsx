import { type FC } from 'react';

interface Props {
  className: string;
}

export const ImageUploader: FC<Props> = ({ className }) => {
  return (
    <div className={`bg-[#D9D9D9] rounded-lg cursor-pointer  relative text-center ${className}`}>
      +
    </div>
  );
};
