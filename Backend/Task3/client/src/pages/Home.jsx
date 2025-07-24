import React from 'react';
import Banner from '../components/Banner';
import FileUpload from '../components/FileUpload';
import FileList from '../components/FileList';

const Dashboard = () => {

  return (
    <>
      <Banner text="Uploaded Files" />
      <FileList />
    </>
  );
};

export default Dashboard;
