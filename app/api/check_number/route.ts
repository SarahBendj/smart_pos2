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
        
        if (response.status === 404) {
           
            return new NextResponse(
                JSON.stringify({ message: "لم يتم العثور على عميل بهذا الرقم." }), 
                { status: 400 }
            );
        }
       

        if (!response.ok) {
            throw new Error(`Failed to fetch data from external API: ${response.statusText}`);
        }

        // Parse the JSON response
        const client = await response.json();
        return new NextResponse(JSON.stringify(client), { status: 200 });

    } catch (error) {
        console.log('eere')
     
        return new NextResponse(JSON.stringify({ error: "Failed to fetch client data" }), { status: 500 });
    }
};
