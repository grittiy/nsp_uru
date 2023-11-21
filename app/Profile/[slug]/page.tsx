
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