import { type FC, type PropsWithChildren } from 'react';

interface Props {
  name: string;
  className?: string;
  value: boolean;
  handleChange: () => void;
}

export const Checkbox: FC<PropsWithChildren<Props>> = ({
  name,
  className,
  value,
  children,
  handleChange,
}) => {
  return (
    <fieldset
      className={`flex w-full justify-between divide-black divide-solid border-b-2 ${
        className ?? ''
      }`}
    >
      <label htmlFor={name} className="text-lg">
        {children}
      </label>
      <input
        id={name}
        className="accent-primary cursor-pointer"
        type="checkbox"
        onChange={handleChange}
        checked={value}
      />
    </fieldset>
  );
};
