
import { Mali } from 'next/font/google'
import './globals.css'
import Providers from './components/Providers'
import Appbar from './components/Appbar'
import { ReactNode } from 'react'





const mail = Mali({ subsets: ['latin'], weight: '200' })

export const metadata = {
  title: 'NSP URU',
  description: 'Northern Science Park URU',
}

interface LayoutProps {
  children: ReactNode;
  userRole: 'ADMIN' | 'DIRECTOR' | 'EMPLOYEE' | 'USER';
}

export default function RootLayout({
  children, userRole
}:LayoutProps ) {
  return (

    <html lang="en">
      <body className={mail.className}>

        <Providers> 
        <Appbar userRole={userRole}/>

          {children}
         
          
        </Providers>
      </body>
    </html>

  )
}
