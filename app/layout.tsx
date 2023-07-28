'use client'
import { Mali } from 'next/font/google'
import './globals.css'
import type { Metadata } from 'next'
import Providers from './components/Providers'
import Appbar from './components/Appbar'



const mail = Mali({ subsets: ['latin'],weight:'200' })

export const metadata: Metadata  = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
    <html lang="en">
      <body className={mail.className}>
        <Providers>
          <Appbar/>
          {children}
          </Providers>
        </body>
    </html>
    </>
  )
}
