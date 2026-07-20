import { type FC } from 'react';

interface selectType {
  array: string[];
  type: string;
  label: string;
  state: string;
  setState: (string: string) => void;
  icon?: any;
}

const Select: FC<selectType> = ({ array, type, label, state, setState, icon }) => {
  const handleChange = ({ target }: { target: HTMLSelectElement }) => setState(target.value);

  return (
    <div className="w-10/12 flex flex-col relative">
      <select
        onChange={handleChange}
        value={state}
        id={label}
        className="selectArrow bg-bg inputFocus cursor-pointer order-2 transition-colors divide-black divide-solid border-b-2 pb-2 px-2 focus:outline-none focus:border-blue-500"
      >
        <option disabled> Elije un campo</option>
        <option>Cualquier tipo</option>
        {array.length > 0 && array.map((item, index) => <option key={index}>{item}</option>)}
      </select>
      <label
        htmlFor={label}
        className="bg-bg translate-y-7 translate-x-2 w-max cursor-pointer transition-transform order-1"
      >
        {label}
      </label>
      {icon && (
        <div className="[&>svg]:absolute [&>svg]:bottom-2 [&>svg]:right-2 [&>svg]:w-6 [&>svg]:h-6">
          {icon}
        </div>
      )}
    </div>
  );
};

export default Select;
