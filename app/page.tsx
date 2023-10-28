
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"
import { User } from "./user"

import LineoaPage from "./components/ScrollReact/LineoaPage"
import CalendarPage from "./components/ScrollReact/CalendarPage"
import ServicesPage from "./components/ScrollReact/ServicesPage"
import HeaderBar from "./components/ui/alert/HeaderBar"
import MyAppBar from "./components/ui/alert/HeaderBar"


export default  async function Page() {
  const session = await getServerSession(authOptions)
  
  // const user = await prisma.user.findFirst({
  //   where:{
  //     email: 'test@test.com'
  //   }
  // })
  return (
    <main>
        <title>หน้าหลัก | NSP URU</title>
        {/* <MyAppBar/> */}
       
        <LineoaPage/>
        <CalendarPage/>
        <ServicesPage/>
  
      
      <h2>Server Session</h2>
      <pre>{JSON.stringify(session)}</pre>
      <h2>Client Call</h2>
      <User/>
    </main>
  )
  
}