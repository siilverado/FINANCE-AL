import { type FC, useRef, useEffect } from 'react';

interface props {
  label: string;
  value: string;
  validation: boolean;
  icon?: any;
  handleLocationName: (string: string) => void;
  // onLocationChange: (latitude: number, longitude: number) => void;
}

const InputLocation: FC<props> = (props) => {
  const { label, icon, handleLocationName, value, validation } = props;

  const autocompleteRef = useRef<HTMLInputElement>(null);

  // const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  const handlePlaceChange = () => {
    //   const place = autocomplete?.getPlace();
    //   if (place && place.geometry) {
    //     const { lat, lng }: any = place.geometry?.location;
    // setLocation(place.formatted_address as string);
    //     onLocationChange(lat(), lng());
    //   }
    const inputLocation = autocompleteRef.current;
    if (inputLocation) {
      handleLocationName(inputLocation.value);
    }
  };

  useEffect(() => {
    const autocompleteInstance = new google.maps.places.Autocomplete(
      autocompleteRef.current as HTMLInputElement,
      {
        types: ['geocode'],
        componentRestrictions: { country: 'ARG' },
      },
    );
    // setAutocomplete(autocompleteInstance);
    autocompleteInstance.addListener('place_changed', handlePlaceChange);
  }, []);

  return (
    <div className="w-10/12 flex flex-col relative h-[60px]">
      <input
        id={label}
        className={`${
          validation ? 'divide-black' : 'divide-red'
        } inputFocus bg-[transparent] order-2 transition-colors border-b-2 pb-2 pl-2 pr-10 focus:outline-none`}
        type="text"
        value={value}
        onChange={(e) => handleLocationName(e.target.value)}
        ref={autocompleteRef}
        placeholder=""
      />
      <label
        htmlFor={label}
        className={`${
          value.length === 0 ? 'translate-y-7 translate-x-2' : 'inputWritten'
        } w-max cursor-pointer transition-transform order-1 z-[300]`}
      >
        {label}
      </label>
      {icon && (
        <div className="[&>svg]:absolute [&>svg]:top-7 [&>svg]:right-2 [&>svg]:w-6 [&>svg]:h-6 pointer-events-none">
          {icon}
        </div>
      )}
      {validation || (
        <span className="order-3 text-red text-md">Error: debes escribir una ubicacion</span>
      )}
    </div>
  );
};

export default InputLocation;
