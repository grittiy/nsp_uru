'use client'
import React, { useEffect } from "react";
import liff from "@line/liff";

const Line = () => {
    useEffect(() => {
        liff.init({ liffId: "1661240172-8pWmk59e" })
            .then(() => {
                //code
                handleLogin()
            })
    }, [])

    const handleLogin = async () => {
        try {
            //code
            const profile = await liff.getProfile()
            // await loginLine(profile)
            // const idToken = liff.getIDToken()
            // console.log(profile,idToken)
        } catch (err) {
            console.log(err)
        }
    }

    return <div>Line</div>
}


export default Line