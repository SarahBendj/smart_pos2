"use client" 
import Get_partner from "@/components/get_contract";


export default function Home() {
  return (
    <div className="flex flex-col justify-center align-center  w-screen">
   
      <main  className="mt-16 mb-4 ">
        <Get_partner />

    
      </main>
      <footer className="row-start-3 flex  flex-wrap items-center justify-center">
     
        <a
          className="flex items-center   hover:underline hover:underline-offset-4"

        >
  
  © 2024 ATM Mobilis. Tous droits réservés→
        </a>
      </footer>
    </div>
  );
}
