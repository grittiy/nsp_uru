// import React from 'react'
// import { Mali } from 'next/font/google';
// import { getServerSession } from 'next-auth';
// import { Box, Paper, Toolbar, Typography } from '@mui/material';
// import { authOptions } from '@/app/api/auth/[...nextauth]/route';
// import AllProfile from '@/app/components/ui/AllProcfile';

// const prompt = Mali({
//     weight: ["300", "400"],
//     style: ["normal", "italic"],
//     subsets: ["latin"],
// });


// type Props = {}

// const ProfilePage = async (props: Props) => {
//     const session = await getServerSession(authOptions)
//     return (
//         <main className="mx-auto container">
//             <title>ข้อมูลส่วนตัว | NSP URU</title>
//             <Toolbar />
//             <Paper elevation={6} sx={{ borderRadius: '1Paper6px' }}>
//                 <Box
//                     sx={{
//                         p: 2,
//                         width: 'auto',
//                         border: 5,
//                         borderColor: "#3182cde6",
//                         borderRadius: '16px',
//                         flexGrow: 2
//                     }}
//                 >
//                     <Typography gutterBottom variant="h5" component="div"
//                         sx={{ fontFamily: prompt.style.fontFamily, paddingLeft: 5, textAlign: 'center' }}>
//                         ข้อมูลส่วนตัว
//                     </Typography>
//                     <AllProfile id={session?.user?.id} />
//                 </Box>
//             </Paper>
//         </main>
//     )
// }

// export default ProfilePage

import React from 'react'
import { prisma } from '@/lib/prisma'
import AllProfile from '@/app/components/ui/AllProcfile'


enum UserRole {
    Admin = "ADMIN",
    Director = "DIRECTOR",
    Employee = "EMPLOYEE",
    User = "USER"
}

enum PersonType {
    Null = "NULL",
    Internal = "INTERNAL",
    External = "EXTERNAL"
}

enum InternalType {
    Null = "NULL",
    Lecturer = "LECTURER",
    Student = "STUDENT",
    Staff = "STAFF"
}

enum ExternalType {
    Null = "NULL",
    Government = "GOVERNMENT",
    Private = "PRIVATE"
}

type Props = {
    id: number
    usr: string
    name: string
    email: string | null
    avatar: string | null
    password: string
    pname: string | null
    fname: string | null
    sex: string | null
    position: string | null
    person: string | null
    phone: string | null
    fax: string | null
    organizationName: string | null
    type: PersonType | null
    internalType: InternalType | null
    externalType: ExternalType | null
}

const EditUser = async ({ params }: { params: { slug: string } }) => {
    const userId = parseInt(params.slug, 10)

    if (isNaN(userId)) {
        return <main>
            Invalid room ID</main>
    }


    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if (!user) {
            return <div>Product id not fount</div>
        }

        const userProps: Props = {
            id: user.id,
            usr: user.usr,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            password: user.password,
            pname: user.pname,
            fname: user.fname,
            sex: user.sex,
            position: user.position,
            person: user.person,
            phone: user.phone,
            fax: user.fax,
            organizationName: user.organizationName,
            type: user.type as PersonType, // "Map the 'type' value to match the 'PersonType' enum.
            internalType: user.internalType as InternalType, // Map the 'internalType' value to match the 'InternalType' enum
            externalType: user.externalType as ExternalType, // Map the 'externalType' value to match the 'ExternalType' enum
        };

        return (
            <div>
                   <title>แก้ไขข้อมูลผู้ใช้งานระบบ | NSP URU</title>
                <AllProfile {...userProps} />
            </div>
        )
    } catch (error) {
        console.log("Error", error)
        return <div>Error fetching user</div>
    }
}


export default EditUser