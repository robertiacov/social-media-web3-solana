'use client';

import Script from "next/script";

import { useRouter } from 'next/router'
import { useEffect } from "react";
import {pageview} from "../lib/gtagHelper"

export default function GoogleAnalytics({GA_MEASUREMENT_ID}){
    const pathname = useRouter()
    const searchParams = useRouter()

    useEffect(() => {
        const url = pathname + searchParams.toString()
    
        pageview(GA_MEASUREMENT_ID, url);
        
    }, [pathname, searchParams, GA_MEASUREMENT_ID]);

    return (
        <>
            <Script strategy="afterInteractive" 
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}/>
            <Script id='google-analytics' strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('consent', 'default', {
                    'analytics_storage': 'denied'
                });
                
                gtag('config', '${GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                });
                `,
                }}
            />
        </>
)}