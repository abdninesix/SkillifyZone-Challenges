import React from 'react';
import Banner from '../components/Banner';

const About = () => {
  return (
    <>
      <Banner text="About This Project" />
      <div className='flex flex-col-reverse md:flex-row'>
        <div className="max-w-2xl rounded mt-4 space-y-4 text-gray-700">
          <p>
            This project is part of a structured learning path focused on mastering full-stack web development. In Week 2, the primary objective was to build a complete authentication system from scratch.
          </p>
          <p>
            The backend is built using Node.js and Express, and includes core authentication features such as user registration, login, logout, password reset via email, and protected routes. JWT (JSON Web Tokens) are used to manage session-based access securely.
          </p>
          <p>
            The frontend, built with React and Tailwind CSS, provides an intuitive interface for users to register, log in, and manage their sessions. Axios is used for communicating with the backend API.
          </p>
          <p>
            This task solidifies important concepts such as secure password handling, token-based authentication, user session management, and building a secure and user-friendly interface for real-world applications.
          </p>
        </div>

        <div className='mt-4 md:w-1/2 flex items-center justify-center'><img src="/skillify.png" alt="cover" className='object-cover' /></div>
      </div>
    </>
  );
};

export default About;
