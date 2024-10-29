async function check_msisdn(msisdn: string) {
    try {
        const response = await fetch(`/api/check_number`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ msisdn })
        });
       
        
        if (!response.ok) {


            throw new Error(`Failed to fetch data from external API`);
        }

        const data = await response.json();
        return data 
    } catch (error) {
       
       
        throw new Error("الرقم غير صحيح. يرجى التحقق منه مرة أخرى. ");
    }
}

export default check_msisdn;