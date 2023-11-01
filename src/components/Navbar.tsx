"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
const Navbar = () => {
  const pathname = usePathname();
  const isAdminRoute: boolean = pathname.includes("admin");

  return (
    <nav className="z-[9] w-[100vw] h-[75px] fixed top-0 left-0 flex justify-between items-center bg-[#151243] max-sm:px-[20px] px-[40px]">
      <Link href={"/"}>
        <figure className="mt-[-15px] w-[100px] h-[50px] relative">
          <Image src={"/assets/images/logo.svg"} alt={"Logo"} fill />
        </figure>
      </Link>

      {!pathname.includes("new") && (
        <>
          {isAdminRoute ? (
            <Link href={"/admin/new"}>
              <span className="max-sm:px-[14px] px-[20px] py-[11px] max-sm:text-[14px] max-sm:py-[10px] rounded-[8px] cursor-pointer bg-[#4130c3] text-[#fff]">
                Add document
              </span>
            </Link>
          ) : (
            <span className="max-sm:px-[14px] px-[20px] py-[11px] max-sm:text-[14px] max-sm:py-[10px] rounded-[8px] cursor-pointer bg-[#4130c3] text-[#fff]">
              Contact us
            </span>
          )}
        </>
      )}
    </nav>
  );
};

export default Navbar;
