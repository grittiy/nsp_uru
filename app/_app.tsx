import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

function Loading() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const handleStart = (url: string) => (url !== router.asPath) && setLoading(true);
        const handleComplete = (url: string) => (url !== router.asPath) && setTimeout(() => { setLoading(false); }, 500);
    
        //routeChangeStart
        //routeChangeComplete
        //routeChangeError
        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleComplete)
        router.events.on('routeChangeError', handleComplete)

        return () => {
            router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleComplete)
            router.events.off('routeChangeError', handleComplete)

        }
    }, [router])
    return loading && (
        <div className='spinner-wrapper'>
            <div className='spinner'/>
        </div>
    )
}

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
        <Loading/>
        <Component {...pageProps} />
        </>
    )
}