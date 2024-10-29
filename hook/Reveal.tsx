'use client'
import { useEffect ,useRef } from "react";
import {motion , useInView , useAnimation } from 'framer-motion';
import React,{ ReactNode } from 'react';

type RevealProps = {
    children : ReactNode
    width ?: "fit-content" | "100%"
    padding ? : "20px"
}


export const Animation = ({ children, width}:RevealProps )=> {

    const ref = useRef<HTMLDivElement |null>(null);
    const inView = useInView(ref , { once: true});
    const controls = useAnimation();
    const slideEffect = useAnimation();

    useEffect(()=> {  
        if( inView ){
            controls.start('visible');
            slideEffect.start('visible');
        }

    }, [inView,controls ,slideEffect])


    return (
        <div ref={ref} style={{ position :"relative", width , overflow :'hidden'}}>
            <motion.div variants={{
                hidden : { opacity : 0 , y : 75},
                visible : { opacity :1 , y : 0}

            }}
            initial = "hidden"
            animate = {controls}
            transition={{ duration : 0.5 , delay : 0.3}}


            >
               {children}

            </motion.div>

            <motion.div
            variants={{
                hidden : {left : 0},
                visible : {left : "100%"}
            }}
            initial="hidden"
            animate={slideEffect}
            transition={{ duration:0.5, ease: 'easeIn'}}
            style={{
                position: 'absolute',
                top: 4,
                bottom : 4,
                right : 0,
                left : 0 ,
                background : 'teal',
                opacity : '0.1',
                zIndex : 10,

            }}>
                
            </motion.div>
        </div>
    )
}

export default Animation;