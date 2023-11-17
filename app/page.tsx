
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"
import { User } from "./user"

import LineoaPage from "./components/ScrollReact/LineoaPage"
import CalendarPage from "./components/ScrollReact/CalendarPage"
import Services from "./Services/page"
import ServicesPage from "./components/ScrollReact/ServicesPage"



export default async function Page() {
  const session = await getServerSession(authOptions)
  console.log('User ID:', session?.user?.id);

  // const user = await prisma.user.findFirst({
  //   where:{
  //     email: 'test@test.com'
  //   }
  // })
  return (
    <main>
      <title>หน้าหลัก | NSP URU</title>
      <div className="px-5 max-w-[1280px] mx-auto">
        <LineoaPage />
        <CalendarPage />
        <br />
        <ServicesPage />
        <br />
      {/* <h2>Server Session</h2>
      <pre>{JSON.stringify(session)}</pre>
      <h2>Client Call</h2> */}
      {/* <User /> */}
      </div>
    </main>
  )

}