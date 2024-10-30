async function check_msisdn(msisdn: string) {
    let message;
    try {
        const response = await fetch(`/api/check_number`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ msisdn })
        });

        if (response.status === 302) {
           
           message= "لقد استنفدت جميع محاولات البحث عن العميل بهذا الرقم." 
                 
        }
        if (response.status === 304) {
           
            message="لم يتم العثور على عميل بهذا الرقم."
                  
              
         }
        
        if (!response.ok) {


            throw new Error(`Failed to fetch data from external API`);
        }

        const data = await response.json();
        return data 
    } catch (error) {
      
        throw new Error ( message || "الرقم غير صحيح. يرجى التحقق منه مرة أخرى. ");
    }
}

export default check_msisdn;