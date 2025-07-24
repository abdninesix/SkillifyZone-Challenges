import React from 'react';
import Banner from '../components/Banner';
import FileUpload from '../components/FileUpload';
import FileList from '../components/FileList';

const Upload = () => {

  return (
    <>
      <Banner text="Upload your files" />
      <FileUpload />
    </>
  );
};

export default Upload;
