'use client'
import React from 'react'
import Layout from '../layout';

const AdminPage: React.FC = () => {
  return (
    <Layout userRole="ADMIN">
      <h1>หน้าแอดมิน</h1>
    </Layout>
  );
};

export default AdminPage;
