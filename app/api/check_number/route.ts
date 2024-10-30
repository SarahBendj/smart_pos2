import { NextResponse } from "next/server";


export const POST = async (request: Request) => {
    try {
        const { msisdn } = await request.json();

       
        const response = await fetch(`${process.env.EXTERNAL_API_URL}/api2/customer/check_if_client_exists/${msisdn}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            }
        });
        console.log(response)
      
        if (response.status === 402) {
           
            return new NextResponse(
                JSON.stringify({ message: "لقد استنفدت جميع محاولات البحث عن العميل بهذا الرقم." }
                ), 
                { status: 302 }
            );
        }
        if (response.status === 404) {
           
            return new NextResponse(
                JSON.stringify({ message: "لم يتم العثور على عميل بهذا الرقم." }), 
                { status:300 }
            );
        }
       

        if (!response.ok) {
            throw new Error(`Failed to fetch data from external API`);
        }

        // Parse the JSON response
        const client = await response.json();
        return new NextResponse(JSON.stringify(client), { status: 200 });

    } catch (error) {
      
        return new NextResponse(JSON.stringify({ error: "Failed to fetch client data" }), { status: 399 });
    }
};
