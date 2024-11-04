"use client" 
import Get_partner from "@/components/get_contract";


export default function Home() {



  
  return (
    <div className="flex flex-col justify-center align-center  w-screen">
   
      <main  className=" max-[800px]:mt-0 mt-16 mb-4 max-[800px]:mx-2 ">
        <Get_partner />

    
      </main>
      <footer className=" flex justify-center items-center w-full    ">
     
        <a
          className=" text-center mt-2 hover:underline-offset-4 max-[800px]:text-sm"

        > © 2024 ATM Mobilis. Tous droits réservés
        </a>
      </footer>
    </div>
  );
}
