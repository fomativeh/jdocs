import { formatDate } from "@/helpers/formateDate";
import Image from "next/image";
import Link from "next/link";

const DocItem = ({docDetails}:{docDetails:any}) => {
  const link = `https://wa.me/+2348175276071?text=Hello%2C%20I'm%20from%20your%20website.%20I%20want%20to%20inquire%20about%20this%20document%3A%0A${docDetails.title}`;
  return (
    
    <section
      className="max-j_tablet:basis-[28vw] cursor-pointer bg-[#fff] pb-[20px] shadow-sm hover:shadow-2xl
     basis-[250px] max-j_tablet:m-[15px] m-[30px] flex-grow max-w-[350px] rounded-[20px] flex flex-col justify-start items-center"
     onClick={()=>window.open(link, "_blank")}
    >
      <figure className="w-full h-[200px] max-j_tablet:h-[30vw] rounded-t-[inherit] relative">
        <Image
          src={"/assets/images/doc.jpg"}
          alt={"Document"}
          fill
          className="rounded-[inherit]"
        />
      </figure>
      <span className="max-j_tablet:text-[4vw] w-full px-[20px] max-j_tablet:pt-[4vw] pt-[30px] text-[#151243] font-bold text-center break-words">
        {docDetails.title}
      </span>

      <section className="w-full flex justify-between items-center max-j_tablet:mt-[5vw] mt-[30px] px-[20px]">
        <span className="bg-[#151243] max-j_tablet:text-[3vw] text-[#fff] rounded-[20px] px-[12px] py-[8px]">
          Available
        </span>
        <span className="text-[#151243] max-j_tablet:text-[3vw]">{formatDate(docDetails.createdAt)}</span>
      </section>
    </section>
  );
};

const DocList = ({ data }: { data: any }) => {
  return (
    <main className="w-full flex justify-center items-center flex-wrap p-[30px] mt-[100px]">
      {data && data?.length>0 && data?.map((eachDoc: any, i:number)=>{
        return (
          <DocItem key={i} docDetails ={eachDoc} />
        )
      })}
    </main>
  );
};

export default DocList;
