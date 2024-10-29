async function provide_contract(msisdn: string) {
    try {
        const response = await fetch(`/api/provide_contract`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ msisdn })
        });
       

        if (!response.ok) {
            throw new Error(`Failed to fetch data from external API: ${response.statusText}`);
        }

               const pdfBlob = await response.blob();

               // Create a URL for the PDF
               const pdfUrl = URL.createObjectURL(pdfBlob);
       
               // Open the PDF in a new tab or download it
               window.open(pdfUrl);
       
               return pdfUrl;
       
    } catch (error) {
     
        throw new Error("Failed to fetch country data");
    }
}

export default provide_contract;