import React from 'react';
import Reveal from '@/hook/Reveal'

interface TitleProps {
    clueTitle: string;
    mainTitle: string;
    description: string;
}

function Header({ clueTitle, mainTitle, description }: TitleProps) {
    return (
        <div className='flex flex-col jusitfy-center items-center max-[600px]:w-full '>
          <h1 className='text-green-700 text-2xl py-4' > {clueTitle} </h1>
          <h2 className='text-lg  my-2 text-center' >   <Reveal>{mainTitle} </Reveal></h2>
          <h4 className='text-lg w-3/5 text-gray-800  max-[600px]:w-full text-center font-thin' >   <Reveal>{description} </Reveal></h4>
        </div>
    );
}

export default Header;
 