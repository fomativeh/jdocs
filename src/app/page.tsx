"use client";
import SearchBar from "@/components/SearchBar";
import Navbar from "../components/Navbar";
import DocList from "@/components/DocList";
import { useContext, useState, useEffect, useCallback } from "react";
import { AppContext } from "@/globalState/globalState";
import { fetchAllDocs } from "./api/document";
import toast, { Toaster } from "react-hot-toast";
import { fetchAllCategories } from "./api/category";
import Image from "next/image";
// import LoaderAnimate from "@/components/loader/LoaderAnimate";
const { dismiss } = toast;

const LoaderAnimate = () => {
  return (
    <div className="lds-spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default function Home() {
  const { appGlobalState, setAppGlobalState } = useContext(AppContext);

  const getDocs = async () => {
    try {
      const fetchDocsRes: any = await fetchAllDocs();
      const { data } = fetchDocsRes;
      setAppGlobalState({
        ...appGlobalState,
        documents: data?.data?.documents,
        categories: data?.data?.categories,
        currentCategory: data?.data?.categories[0],
      });
    } catch (error) {
      toast.error("Network error. Please retry.");
      console.log(error);
    }
  };

  useEffect(() => {
    getDocs();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start pt-[75px] bg-[#c5cdec]">
    <Toaster />
    <Navbar />
    <SearchBar />

    {!appGlobalState?.isSearching &&
      appGlobalState?.documents?.length > 0 && (
        <DocList
          data={appGlobalState.documents.filter(
            (e) => e.category == appGlobalState.currentCategory
          )}
        />
      )}

    {appGlobalState?.documents?.length == 0 && appGlobalState.categories.length==0 &&
      !appGlobalState.isSearching && (
        <section className="flex-grow flex  flex-col justify-center items-center w-full bg-[#0b0c3a] z-[99] mt-[-2px]">
          <span className="mb-[30px] max-w-[80%] text-[19px] text-center font-bolder font-[Poppins]">
            Loading our documents. Please wait...
          </span>
          <LoaderAnimate />
        </section>
      )}

    {appGlobalState.isSearching && (
      <DocList data={appGlobalState.queryItems} />
    )}

    {appGlobalState.isSearching && appGlobalState.queryItems.length == 0 && (
      <section className=" flex-grow flex flex-col justify-center items-center w-full bg-[#ffffff] z-[99] mt-[-44px]">
        <figure className="w-[80%] h-[300px] relative mb-[30px]">
          <Image
            src={"/assets/images/unavailable.svg"}
            alt={"Unavailable illustration"}
            fill
          />
        </figure>
        <span className="mb-[30px] max-w-[80%] text-[19px] text-center text-[#000] font-bolder font-[Poppins]">
          Document unavailable
        </span>
      </section>
    )}

    </main>
  );
}
