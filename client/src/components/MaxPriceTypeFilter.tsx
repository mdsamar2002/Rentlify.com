type Props = {
  selectedMaxPriceTypes?: number;
  onChange: (value?: number) => void;
};

const MaxPriceTypeFilter = ({ selectedMaxPriceTypes, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Maximum Price</h4>
      <select
        className="p-2 border rounded-md w-full"
        value={selectedMaxPriceTypes}
        onChange={(event) =>
          onChange(
            event.target.value ? parseInt(event.target.value) : undefined
          )
        }
      >
        <option value="">Select Max Price</option>
        {[14999, 9999, 7999, 5999, 3999].map((price) => (
          <option value={price}>{price}</option>
        ))}
      </select>
    </div>
  );
};

export default MaxPriceTypeFilter;
