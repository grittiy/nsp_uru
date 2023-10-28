import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const password = await hash('1234',20)
  const user = await prisma.user.upsert({
    where: { email: 'test@test.com' },
    update: {},
    create: {
      email: 'test@test.com',
      name: 'Test User',
      role: 'EMPLOYEE',
      password
    }
  })
  const user2 = await prisma.user.upsert({
    where: { email: 'admin@test.com' },
    update: {},
    create: {
      email: 'admin@test.com',
      name: 'admin',
      role: 'ADMIN',
      password
    }
  })
  const user3 = await prisma.user.upsert({
    where: { email: 'director@test.com' },
    update: {},
    create: {
      email: 'director@test.com',
      name: 'director',
      role: 'DIRECTOR',
      password
    }
  })
  console.log({ user })

  const room = await prisma.rooms.createMany ({
    data: [
      {
        name: "ห้องสโลป (STC)",
        details: "อุปกรณ์  1.โปรเจคเตอร์ 2.ไมโครโฟนและเครื่องขยายเสียง 3.สาย HDMI",
        no: "112",
        building: "มหาวิทยาลัยราชภัฏอุตรดิตถ์ วิทยาเขตสำรางทุ่งกะโล่",
        location: "https://maps.app.goo.gl/neuWX35YaFDG2x4Q7",
        roomimage: "https://res.cloudinary.com/dvnewo4hn/image/upload/v1697531052/cf6zdfyynf1kmfcermfd.jpg",
        active: true
      },
      {
        name: "Meeting Room 1",
        details: "A cozy meeting room for small team discussions.",
        no: "6",
        building: "East Wing",
        location: "37.7749,-122.4194",
        roomimage: "https://res.cloudinary.com/dvnewo4hn/image/upload/v1697531052/cf6zdfyynf1kmfcermfd.jpg",
        active: false
      },
      {
        name: "Lecture Hall B",
        details: "Large lecture hall with stadium seating.",
        no: "100",
        building: "Education Center",
        location: "37.7749,-122.4194",
        roomimage: "https://res.cloudinary.com/dvnewo4hn/image/upload/v1697531052/cf6zdfyynf1kmfcermfd.jpg",
        active: false
      }
    ]
  })
  console.log ('Created restaurants:', room.count)
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })