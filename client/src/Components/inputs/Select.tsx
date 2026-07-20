import { type FC, useState } from 'react';

interface selectType {
  array: string[];
  label: string;
  value: string;
  validation: boolean;
  anyOption?: boolean;
  icon?: any;
  handleClick: (option: string) => void;
}

const Select: FC<selectType> = ({
  handleClick,
  array,
  value,
  label,
  icon,
  anyOption = true,
  validation,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const handleOption = (item: string) => {
    handleClick(item);
    handleOpen();
  };

  return (
    <div className="w-10/12 flex flex-col relative h-[60px]">
      <input
        id={label}
        className={`${
          validation ? 'divide-black' : 'divide-red'
        } inputFocus bg-[transparent] order-2 transition-colors  border-b-2 pb-2 pl-2 pr-10 focus:outline-none`}
        readOnly
        type={'text'}
        value={value}
        onClick={handleOpen}
      />
      <label
        htmlFor={label}
        className={`${
          value.length === 0 ? 'translate-y-7 translate-x-2' : 'inputWritten'
        } w-max cursor-pointer transition-transform order-1 z-[300]`}
      >
        {label}
      </label>
      {open && (
        <>
          <ul className="flex order-3 z-[500] gap-2 flex-col w-max bg-white py-5 absolute top-[58px] rounded-lg">
            {anyOption && (
              <li
                onClick={() => handleOption('Cualquier tipo')}
                className="active:bg-primary px-10 py-2 cursor-pointer"
              >
                Cualquier tipo
              </li>
            )}
            {array.map((item) => {
              return (
                <li
                  key={item}
                  onClick={() => handleOption(item)}
                  className="active:bg-primary px-10 py-2 cursor-pointer"
                >
                  {item}
                </li>
              );
            })}
          </ul>
        </>
      )}
      {icon && (
        <div className="[&>svg]:absolute [&>svg]:top-7 [&>svg]:right-2 [&>svg]:w-6 [&>svg]:h-6 pointer-events-none">
          {icon}
        </div>
      )}
      {validation || (
        <span className="order-3 text-red">Error: debes seleccionar un tipo de cancha</span>
      )}
    </div>
  );
};

export default Select;
