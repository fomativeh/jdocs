"use client";
import { fetchAllCategories } from "@/app/api/category";
import { addDoc, fetchAllDocs } from "@/app/api/document";
import Navbar from "@/components/Navbar";
import { AppContext } from "@/globalState/globalState";
import { useRouter } from "next/navigation";
import React, { FormEvent } from "react";
import { useState, useEffect, useContext } from "react";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
const { dismiss } = toast;

const Page = () => {
  const [title, setTitle] = useState<string>("");
  const [newCategory, setNewCategory] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [newCategoryVisible, setNewCategoryVisible] = useState<boolean>(false);
  const [categories, setCategories] = useState<string[]>([]);
  const { appGlobalState, setAppGlobalState } = useContext(AppContext);
  const router = useRouter()


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title == "") {
      return toast.error("A title is required.");
    }

    const category = selectedCategory == "" ? newCategory : selectedCategory;
    if (category == "") {
      return toast.error("Select or enter a category.");
    }
    const loadingToast = toast.loading("Creating document. Please wait...");
    const createDocRes: any = await addDoc({ title, category });
    dismiss(loadingToast);
    toast.success("Document created.")
    const { data } = createDocRes;
    setAppGlobalState({...appGlobalState, documents:[...appGlobalState.documents, data.data]})
    router.push("/admin")
    setNewCategory("");
    setTitle("");
    setSelectedCategory("");
  };

  const loadCategories = async () => {
    const fetchCategoriesRes: any = await fetchAllCategories();
    const { data } = fetchCategoriesRes;
    setCategories(data?.data);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <main className="flex flex-col justify-start items-center pt-[75px] bg-[#c5cdec] min-h-screen">
      <Navbar />
      <Toaster />
      <form
        onSubmit={handleSubmit}
        className="w-full max-sm:w-[95vw] sm:w-[400px] flex flex-col justify-start items-center mt-[40px] bg-[#151243d5] max-sm:px-[15px] px-[35px] py-[30px] rounded-[20px]"
      >
        <section className="w-[95%] flex flex-col justify-start items-start mb-[30px]">
          <label
            className="mb-[14px] font-semibold text-[20px]"
            htmlFor="title"
          >
            Document title
          </label>
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            name="tile"
            id="title"
            className="text-[#000] pt-[10px] pl-[10px] rounded-[12px] w-full min-w-full h-[150px] max-h-[300px] min-h-[100px] outline-none"
          ></textarea>
        </section>

        {newCategory == "" && (
          <section className="w-[95%] flex flex-col justify-start items-start mb-[30px]">
            <label
              className="mb-[14px] font-semibold text-[20px]"
              htmlFor="title"
            >
              Category
            </label>
            <select
              name="category"
              id="category"
              className="cursor-pointer text-[#000] w-[100%] h-[40px] pl-[10px]"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories && categories?.length > 0 &&
                categories?.map((eachCategory: any, i: number) => {
                  return (
                    <option value={eachCategory} key={i}>
                      {eachCategory[0]?.toUpperCase() +
                        eachCategory?.slice(1)?.toLowerCase()}
                    </option>
                  );
                })}
            </select>
          </section>
        )}

        {selectedCategory == "" && (
          <section className="w-[95%] flex flex-col justify-start items-start mb-[25px]">
            <label
              className="mb-[14px] font-semibold text-[20px]"
              htmlFor="newCategory"
            >
              New Category
            </label>
            <input
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              name="newCategory"
              id="newCategory"
              className="text-[#000] pl-[10px] outline-none w-full h-[50px] rounded-[12px]"
            />
          </section>
        )}

        <button
          type="submit"
          className="border-[none] w-[95%] h-[40px] rounded-[15px] text-[#fff] bg-[#4130c3]"
        >
          Submit
        </button>
      </form>
    </main>
  );
};

export default Page;
