import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetPetQuery } from "./petApiService";
import Results from "./Results";
import useBreedList from "./useBreedList";
import { all } from "./searchParamsSlice";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const adoptedPet = useSelector((state) => state.adoptedPet.value);
  const searchParams = useSelector(state => state.searchParams.value);
  const [animal, setAnimal] = useState("");
  const [breeds] = useBreedList(animal);
  const dispatch = useDispatch();
  let { data: pets} = useGetPetQuery(searchParams);
  pets = pets ?? [];

  return (
    <div className="my-0 mx-auto w-11/12">
      <form
      className="p-10 bg-gray-200 shadow-lg mb-10 flex flex-col items-center justify-center rounded-lg"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get("animal") ?? "",
            breed: formData.get("breed") ?? "",
            location: formData.get("location") ?? "",
          };
          dispatch(all(obj));
        }}
      >
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input
          type="text"
          id="location"
          name="location"
          className="search-input"
          placeholder="Location" />
        </label>

        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            name="animal"
            className="search-input"
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
            onBlur={(e) => {
              setAnimal(e.target.value);
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="breed">
          Breed
          <select
          disabled={!breeds.length}
          className="search-input grayed-out-disable"
          id="breed"
          name="breed">
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>

        <button
        className="rounded px-6 py-2 text-white border-none hover:opacity-50 bg-orange-500">Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
