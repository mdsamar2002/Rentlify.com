import { useQuery } from "@tanstack/react-query";
import { useSearchContext } from "../contexts/SearchContext";
import * as apiClient from "../api/apiClient";
import React, { useState } from "react";
import SearchResultCard from "../components/SearchResultCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypesFilter from "../components/HotelTypesFilter";
import FacilitiesTypeFilter from "../components/FaclilitiesTypeFilter";
import MaxPriceTypeFilter from "../components/MaxPriceTypeFilter";

const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
  const [selectedFacilityTypes, setSelectedFacilityTypes] = useState<string[]>(
    []
  );
  const [selectedMaxPrice, setSelectedMaxPrice] = useState<
    number | undefined
  >();
  const [selectedSortOPtion, setSelectedSortOPtion] = useState<string>("");

  const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;
    setSelectedStars((prevStars) =>
      event.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating)
    );
  };

  const handleHotelTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const hotelType = event.target.value;

    setSelectedHotelTypes((prevHotel) =>
      event.target.checked
        ? [...prevHotel, hotelType]
        : prevHotel.filter((hotel) => hotel !== hotelType)
    );
  };

  const handleFacilityTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const facilityType = event.target.value;

    setSelectedFacilityTypes((prevFacility) =>
      event.target.checked
        ? [...prevFacility, facilityType]
        : prevFacility.filter((facility) => facility !== facilityType)
    );
  };

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedHotelTypes,
    facilities: selectedFacilityTypes,
    maxPrice: selectedMaxPrice?.toString(),
    sortOption: selectedSortOPtion.toString(),
  };

  const { data: hotelData } = useQuery({
    queryKey: ["searchHotels", searchParams],
    queryFn: () => apiClient.searchHotels(searchParams),
  });
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="rounded-lg border border-slate-300 p-5 h-fit md:sticky top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter by:
          </h3>
          <StarRatingFilter
            selectedStars={selectedStars}
            onChange={handleStarsChange}
          />
          <HotelTypesFilter
            selectedHotelTypes={selectedHotelTypes}
            onChange={handleHotelTypeChange}
          />
          <FacilitiesTypeFilter
            selectedFacilityTypes={selectedFacilityTypes}
            onChange={handleFacilityTypeChange}
          />
          <MaxPriceTypeFilter
            selectedMaxPriceTypes={selectedMaxPrice}
            onChange={(value?: number) => setSelectedMaxPrice(value)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            <span className="mr-2">
              {hotelData?.pagination.total} Hotels found
            </span>
            {search.destination ? `in ${search.destination}` : ""}
          </span>
          <select
            className="border border-slate-300 rounded-md px-2 py-1 w-fit"
            value={selectedSortOPtion}
            onChange={(event) => setSelectedSortOPtion(event.target.value)}
          >
            <option value="">Sort by</option>
            <option value="starRating">Star Rating</option>
            <option value="pricePerNightAsc">Price PerNight ↓</option>
            <option value="pricePerNightDesc">Price PerNight ↑</option>
          </select>
        </div>
        {hotelData?.data.map((hotel): React.JSX.Element => {
          return <SearchResultCard hotel={hotel} />;
        })}
        <div>
          <Pagination
            page={hotelData?.pagination.page || 1}
            pages={hotelData?.pagination.pages || 1}
            onPageChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
