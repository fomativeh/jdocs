"use client";
import { fetchAllCategories } from "@/app/api/category";
import { AppContext } from "@/globalState/globalState";
import { useState, useEffect, useContext } from "react";
const SearchBar = () => {
  const { appGlobalState, setAppGlobalState } = useContext(AppContext);
  const [query, setQuery] = useState<string>("");
  useEffect(() => {
      setAppGlobalState({
        ...appGlobalState,
        currentCategory: appGlobalState?.categories[0],
      });
  }, [appGlobalState?.categories]);

  useEffect(() => {
    if (query !== "") {
      setAppGlobalState({
        ...appGlobalState,
        isSearching: true,
        queryItems: appGlobalState.documents
          .filter((e) => e.category == appGlobalState.currentCategory)
          .filter((e) => e.title.toLowerCase().includes(query.toLowerCase())),
      });
    } else {
      setAppGlobalState({ ...appGlobalState, isSearching: false });
    }
  }, [query]);

  return (
    <header className="z-[9] w-full flex flex-col justify-start items-start fixed top-[75px] left-0 bg-[#1f1259]">
      <section className="max-sm:px-[20px] bg-[#4694cb] w-full h-[65px] flex justify-center items-center">
        <section className="h-[60%] max-sm:w-[85%] w-[300px] relative mr-[20px]">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Find a document..."
            className="h-full w-full border-none text-[12px] placeholder:text-[#575757] placeholder:text-[12px] outline-none rounded-[15px] px-[10px] bg-[#fff] text-[#151234]"
          />
          {query.length > 0 && (
            <span
              className="w-[20px] h-[20px] flex justify-center items-center bg-[#1f1259] 
          text-[#fff] cursor-pointer rounded-[50px] absolute top-[27%] right-[10px]"
              onClick={() => setQuery("")}
            >
              x
            </span>
          )}
        </section>
        <select
          name="category"
          id="category"
          className="text-[12px] cursor-pointer text-[#000] max-sm:w-[120px] w-[200px] outline-none h-[60%] rounded-[12px] pl-[10px]"
          onChange={(e) =>
            setAppGlobalState({
              ...appGlobalState,
              currentCategory: e.target.value,
            })
          }
        >
          {appGlobalState?.categories?.length > 0 &&
            appGlobalState?.categories?.map((eachCategory: any, i: number) => {
              return (
                <option value={eachCategory} key={i}>
                  {eachCategory[0]?.toUpperCase() +
                    eachCategory?.slice(1)?.toLowerCase()}
                </option>
              );
            })}
        </select>
      </section>

      <h1 className="m-0 my-[12px] ml-[20px] text-[#151243] text-[12px] font-bold bg-[#fff] rounded-[14px] px-[14px] py-[7px]">
        {appGlobalState.currentCategory}
      </h1>
    </header>
  );
};

export default SearchBar;
