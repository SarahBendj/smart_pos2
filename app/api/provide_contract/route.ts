import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    try {
        const { msisdn } = await request.json();

        if (!msisdn) {
            return new NextResponse('MSISDN is required', { status: 400 });
        }

        // Fetch the PDF from the external API
        const response = await fetch(`${process.env.EXTERNAL_API_URL}/api2/serve-pdf/${msisdn}`, {
            method: 'GET',
            headers: {
                "Accept": "application/pdf",
            }
        });
        


        if (!response.ok) {
            throw new Error(`Failed to fetch data from external API: ${response.statusText}`);
        }

        // Check if the response is a PDF
        const contentType = response.headers.get("Content-Type");
        if (contentType !== "application/pdf") {
            throw new Error(`Expected PDF, but received: ${contentType}`);
        }

        // Get the PDF as a Blob
        const pdfBlob = await response.blob();
        const pdfArrayBuffer = await pdfBlob.arrayBuffer();

        // Define the filename (adjust as needed)
        const fileName = `${msisdn}.pdf`;

        // Create a new Response with the PDF data
        return new NextResponse(pdfArrayBuffer, {
            status: 200,
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename="${fileName}"`,
                "Content-Length": pdfArrayBuffer.byteLength.toString()
            }
        });

    } catch (error) {
      

        // Return an error response
        return new NextResponse(JSON.stringify({ error: "Failed to fetch PDF" }), { status: 500 });
    }
};


