import { hotelFacilities } from "../config/hotel-options-config";

type Props = {
    selectedFacilityTypes: string[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };
  
  const FacilitiesTypeFilter = ({ selectedFacilityTypes, onChange }: Props) => {
    return (
      <div className="border-b border-slate-300 pb-5">
        <h4 className="text-md font-semibold mb-2">Facilities</h4>
        {hotelFacilities.map((facilitytype) => (
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="rounded"
              value={facilitytype}
              checked={selectedFacilityTypes.includes(facilitytype)}
              onChange={onChange}
            />
            <span>{facilitytype}</span>
          </label>
        ))}
      </div>
    );
  };
  
  export default FacilitiesTypeFilter;
  