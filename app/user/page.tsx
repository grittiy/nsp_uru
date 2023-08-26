'use client'
import { useEffect, useState } from "react";
import Layout from "../layout";
import dynamic from "next/dynamic";
import Appbar from "../components/Appbar";
import LineoaPage from "../components/ScrollReact/LineoaPage";
import CalendarPage from "../components/ScrollReact/CalendarPage";
import ServicesPage from "../components/ScrollReact/ServicesPage";


const StaffPage: React.FC = () => {
  // const [isClient, setIsClient] = useState(false)
  // useEffect(() => {
  //   setIsClient(true)
  // }, [isClient,setIsClient])
  return (
    <>
   
   <Layout userRole="USER">

      {/* <div>{isClient ? 'This is never prerendered' : 'Prerendered'}</div> */}
      <div> หน้าเจ้าหน้าที่</div>
      </Layout>
    </>
   
  );
};

export default StaffPage;