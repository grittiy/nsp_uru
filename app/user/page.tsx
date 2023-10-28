
import { useEffect, useState } from "react";
import Layout from "../layout";
import dynamic from "next/dynamic";

import LineoaPage from "../components/ScrollReact/LineoaPage";
import CalendarPage from "../components/ScrollReact/CalendarPage";
import ServicesPage from "../components/ScrollReact/ServicesPage";
import MyAppBar from "../components/ui/alert/HeaderBar";


const StaffPage: React.FC = () => {
  // const [isClient, setIsClient] = useState(false)
  // useEffect(() => {
  //   setIsClient(true)
  // }, [isClient,setIsClient])
  return (
    <>
   {/* <MyAppBar/> */}
   {/* <Layout userRole="USER"> */}

      {/* <div>{isClient ? 'This is never prerendered' : 'Prerendered'}</div> */}
      <div> หน้าเจ้าหน้าที่</div>
      {/* </Layout> */}
    </>
   
  );
};

export default StaffPage;