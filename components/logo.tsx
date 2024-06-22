import Link from "next/link"
export const Logo= ()=>{

    return (
        <Link href="/dashboard"> 
        <div className="flex justify-start items-center leading-[117.02%] cursor-pointer font-poppins">
          <b className="text-[21px] sm:text-[25px] text-custom-primary">
            Edu
          </b>
          <span className="font-poppins text-black text-[21px] sm:text-[25px]">cation</span>
        </div>
        </Link>
    )
}