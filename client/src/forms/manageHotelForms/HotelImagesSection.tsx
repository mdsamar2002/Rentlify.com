import { useFormContext } from "react-hook-form";
import { HotelFormData } from "../ManageHotelForm";

const HotelImagesSection = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<HotelFormData>();

  const existingImageUrls = watch("imageUrls");

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ImageUrls: string
  ) => {
    event.preventDefault();
    setValue(
      "imageUrls",
      existingImageUrls.filter((urls) => urls !== ImageUrls),
      {
        shouldValidate: true,
        shouldDirty: true,
      },
    );
  };
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        {existingImageUrls && (
          <div className="grid grid-cols-6 gap-4">
            {existingImageUrls.map((url) => (
              <div className="relative group">
                <img
                  src={url}
                  alt="uploaded image"
                  className="min-h-full object-cover"
                />
                <button
                  onClick={(event) => handleDelete(event, url)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full text-gray-700 font-normal"
          {...register("imageFiles", {
            validate: (imageFiles: FileList) => {
              const uploadedFilesLength = imageFiles?.length || 0;
              const existingUrlsLength = existingImageUrls?.length || 0;
              const totalLength = uploadedFilesLength + existingUrlsLength;
              if (totalLength === 0) {
                return "At least one image is required";
              } else if (totalLength > 6) {
                return "Total number of image cannot be more than six";
              } else {
                return true;
              }
            },
          })}
        />
        {errors.imageFiles && (
          <span className="text-red-500 text-sm font-bold">
            {errors.imageFiles.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default HotelImagesSection;
