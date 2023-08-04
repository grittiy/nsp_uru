
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"
import { User } from "./user"

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
      <h2>Server Session</h2>
      <pre>{JSON.stringify(session)}</pre>
      <h2>Client Call</h2>
      <User/>
    </main>
  )
  
}