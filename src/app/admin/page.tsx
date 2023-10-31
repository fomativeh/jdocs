"use client";
import SearchBar from "@/components/SearchBar";
import Navbar from "../../components/Navbar";
import DocList from "@/components/DocList";
import { useContext, useState, useEffect, useCallback } from "react";
import { AppContext } from "@/globalState/globalState";
import { fetchAllDocs } from "../api/document"
import toast, { Toaster } from "react-hot-toast";
import LoaderAnimate from "../../components/Loader/LoaderAnimate";
import { fetchAllCategories } from ".././api/category";
const { dismiss } = toast;

export default function Admin() {
  const { appGlobalState, setAppGlobalState } = useContext(AppContext);

  const getDocs =async () => {
    try {
      const fetchDocsRes: any = await fetchAllDocs();
      const { data } = fetchDocsRes;
      setAppGlobalState({ ...appGlobalState, documents: data?.data });
    } catch (error) {
      toast.error("Network error. Please retry.");
      console.log(error);
    }
  }

  const loadCategories = async () => {
    const fetchCategoriesRes: any = await fetchAllCategories();
    const { data } = fetchCategoriesRes;
    setAppGlobalState({ ...appGlobalState, categories: data?.data });
  }

  useEffect(() => {
    getDocs();
    loadCategories();
  })

  return (
    <main className="flex min-h-screen flex-col items-center justify-start pt-[75px] bg-[#c5cdec]">
      <Toaster />
      <Navbar />
      <SearchBar />
      {appGlobalState?.documents?.length>0 && (
        <DocList data={appGlobalState.documents} />
      )}
      {appGlobalState?.documents?.length == 0 && (
        <section className="flex-grow flex  flex-col justify-center items-center w-full bg-[#0b0c3a] z-[99] mt-[-2px]">
          <span className="mb-[30px] max-w-[80%] text-[19px] text-center font-bolder font-[Poppins]">
            Loading our documents. Please wait...
          </span>
          <LoaderAnimate />
        </section>
      )}
    </main>
  );
}
