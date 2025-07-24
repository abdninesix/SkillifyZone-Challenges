import React from 'react';
import Banner from '../components/Banner';

const About = () => {
  return (
    <>
      <Banner text="About This Project" />
      <div className='flex flex-col-reverse md:flex-row'>
        <div className="max-w-2xl rounded mt-4 space-y-4 text-gray-700">
          <p>
            This project is part of a full-stack learning roadmap focused on implementing real-world features using modern web technologies. The core objective was to build a complete file upload and management system with cloud integration.
          </p>
          <p>
            The backend is powered by Node.js and Express, and integrates with MongoDB for storing metadata and ImageKit for storing media files in the cloud. It includes routes for uploading, retrieving, and deleting files securely.
          </p>
          <p>
            The frontend is built with React and Tailwind CSS, providing a responsive UI to upload files, display previews, and manage uploaded documents. Axios handles API communication between the client and server.
          </p>
          <p>
            This task reinforces essential full-stack concepts such as handling file uploads with Multer, cloud storage integration, CRUD operations with a database, and building intuitive user experiences for managing media content.
          </p>
        </div>
        <div className='mt-4 md:w-1/2 flex items-center justify-center'><img src="/skillify.png" alt="cover" className='object-cover' /></div>
      </div>
    </>
  );
};

export default About;
