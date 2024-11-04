"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Header from "./Header";
import check_msisdn from "@/lib/check_msisdn";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import * as React from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import provide_contract from "@/lib/provide_contract";
import Image from "next/image";
import Veganrecipe from "@/public/image/logo_mob.png";
import { Loader } from 'lucide-react';


const formSchema = z.object({
  phoneNumber: z
    .string()
    .length(12, { message: "يجب أن يتكون رقم الهاتف من 12 رقماً بالضبط" })
    .regex(/^\d+$/, { message: "يجب أن يحتوي رقم الهاتف على أرقام فقط" })
    .refine((value) => value.startsWith('2136'), {
      message: "يجب أن يبدأ رقم الهاتف بـ 2136.",
    }),
    
});



export default function Get_partner() {
  const CardStyle: string = `p-2 opacity-100 rounded-lg text-white   bg-gradient-to-l from-green-800 from-20% to-green-950 to-50%  border border-green-500 `;
  const { toast } = useToast();
  const [showOTP, setShowOTP] = useState<boolean>(false);
  const [validOtp, setValidOtp] = useState<null | string>(null); // Change to string to match OTP format
  const [UserManualOTP, setUserManualOTP] = React.useState<string>('');
  const [msisdn, setMsisdn] = React.useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneNumber: ""
    },
  });

  async function verify_msisdn(
     
    values: z.infer<typeof formSchema> 
) {
   
    try {
  
      const data = await check_msisdn(values.phoneNumber);
      setMsisdn(values.phoneNumber)
      setValidOtp(data.otp);
      setShowOTP(true);
       toast({
        title: "نجاح!",
        description: "تم إرسال رمز التحقق بنجاح.",
      });
      form.reset();
    
    

    } catch (error) {
   
  
      const errorMessage: string = (error as Error).message || "كانت هناك مشكلة في إرسال رمز التحقق.";

      
        toast({
            variant: "destructive",
            title: "حدث خطأ.",
            description: errorMessage,
        });

    }
    setIsLoading(false);
  }

  async function retrieve_contract() {
   
    try {
        if (validOtp && UserManualOTP == validOtp) {
      
            const pdfUrl = await provide_contract(msisdn);

            if (pdfUrl) {
                window.open(pdfUrl);

                toast({
                    title: "نجاح!",
                    description: "تم استرجاع العقد بنجاح.",
                });

                form.reset();
            } else {
                throw new Error("لم يتم العثور على العقد.");
            }
        } else {
            toast({
                variant: "destructive",
                title: "رمز التحقق غير صحيح",
                description: "الرمز الذي أدخلته غير صحيح.",
            });
        }
    } catch (error) {
        toast({
            variant: "destructive",
            title: "خطأ",
            description: "حدث خطأ أثناء استرجاع العقد. الرجاء المحاولة مرة أخرى.",
        });
    }

    setIsLoading(false);
    setMsisdn('')
    setUserManualOTP('')
}


  return (
    <div className='flex flex-col justify-between items-center  w-full '>
      <div className="  max-[800px]:shadow-green-950 border-t-4 border-green-800 max-[800px]:w-full w-1/2 shadow-xl p-4 rounded-lg">
      <div className="flex justify-center items-center w-full ">
        
  <Image
    src={Veganrecipe}
    alt="Header Image"
    width={200} 
    height={10}
    priority
  />
</div>

      <div className="mb-8  max-[800px]:mb-4  max-[800px]:w-full ">
        <Header  
          clueTitle={"بوابة موبيليس"}
          mainTitle={"اطلب عقدك بطريقة آمنة"}
          description={"الرجاء إدخال رقم هاتفك المحمول لاستلام رمز التحقق (OTP)، ومن ثم سنقوم بتزويدك بعقدك في الحال."}
        />
      </div>
      <Form {...form}>
        <div className={` flex flex-col items-center justify-center max-[600px]:w-full bg-green-100  text-sm ${CardStyle}`}>
          {/* <h2 className='mt-0 text-2xl text-gray-200'>{showOTP ? 'رمز التحقق' : 'العقد'}</h2> */}
          <form  className={`space-y-4 w-full mx-4`}>
            <div className={` flex flex-col items-center `}>
              {showOTP ? (
  
                <div className="space-y-4 space-x-4 text-lg z-50  ">
                  <InputOTP
                    maxLength={6}
                    value={UserManualOTP}
                    onChange={(value) => setUserManualOTP(value)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        event.preventDefault(); 
                        retrieve_contract(); 
                        
                      }
                    }}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                  <div className="text-center text-sm">
                    {!UserManualOTP ? (
                      <>أدخل رمز التحقق لمرة واحدة.</>
                    ) : (
                      <>لقد أدخلت: {UserManualOTP}</>
                    )}
                  </div>
                </div>
              ) : (
                <FormField
                
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem className=" max-[800px]:mb-10 relative h-16 flex justify-center  w-80 items-align   max-[800px]:flex-col  flex-row-reverse max-[800px]:w-full  ">
                    <FormLabel className=" text-sm w-full text-right pl-8 mt-4  max-[800px]:p-0 ">رقم الهاتف</FormLabel>
                    <FormControl >
                  
                      <Input 
                        placeholder="21366000000"
                        className=" text-sm text-gray-950 px-4 text-right my-0 w-full bg-green-100" 
                        {...field} 
                        onKeyDown={(event) => {
                          if (event.key === 'Enter') {
                            event.preventDefault(); 
                            form.handleSubmit(async (values) => {
                              await verify_msisdn(values); 
                            })();
                          }
                        }}
                        
                      />
       
  
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  
                  )}
                />
              )}
            </div>

           <Button
  type="button" 
  className={`w-full text-sm py-6 border bg-green-900 border-green-700 hover:bg-green-700`}
    onClick={(e :React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
    if (showOTP) {
       retrieve_contract();
    } else {
      form.handleSubmit(async (values) => {
        setIsLoading(true);
        try {
          await verify_msisdn( values);
        } catch (error) {
        
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }}
  disabled={isLoading}
>
  {isLoading ? <Loader /> : (showOTP ? 'أرسل رمز التحقق' : 'إرسال رقم الهاتف')}
</Button>

          </form>
        </div>
      </Form>
    </div>
    </div>
  );
}
