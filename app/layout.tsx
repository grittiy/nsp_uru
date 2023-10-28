
import { Mali } from 'next/font/google'
import './globals.css'
import Providers from './components/Providers'
import MyAppBar from './components/ui/alert/HeaderBar'


const mail = Mali({ subsets: ['latin'], weight: '200' })

export const metadata = {
  title: 'NSP URU',
  description: 'Northern Science Park URU',
}

// interface LayoutProps {
//   children: ReactNode;
//   userRole: 'ADMIN' | 'DIRECTOR' | 'EMPLOYEE' | 'USER';
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
})  {
  return (

    <html lang="en">
      <body className={mail.className}>

        <Providers> 
        <MyAppBar/>
       
{/* <MyAppBar/> */}
          {children}
         
          
        </Providers>
      </body>
    </html>

  )
}