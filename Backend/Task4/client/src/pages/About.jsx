import React from 'react';
import Banner from '../components/Banner';

const About = () => {
  return (
    <>
      <Banner text="About This Project" />
      <div className='mb-10 flex flex-col-reverse md:flex-row'>
        <div className="max-w-2xl rounded mt-4 space-y-4 text-gray-700">
          <p>
            This project is part of a learning journey focused on building full-stack web applications. In Week 1, the primary goal was to design and implement a RESTful API for a simple blogging platform.
          </p>
          <p>
            The backend was developed with a focus on REST architecture principles and included full CRUD functionality—allowing users to create, read, update, and delete blog posts. User authentication was implemented using JSON Web Tokens (JWT) to secure endpoints and ensure proper access control.
          </p>
          <p>
            In Week 4, Role-Based Access Control (RBAC) was introduced to support multiple user roles—admin, editor, and viewer. This system ensures that only authorized users can perform specific actions. For example, only admins can delete posts, while editors can create and update them. Viewers have read-only access.
          </p>
          <p>
            The RBAC logic is enforced both on the backend using middleware and reflected on the frontend through conditional rendering. This improves both security and user experience by preventing unauthorized actions and hiding restricted UI elements.
          </p>
          <p>
            The application integrates a database to persist user accounts, blog posts, roles, and timestamps. Technologies used include Express.js, MongoDB, JWT for authentication, and custom middleware for access control.
          </p>
        </div>

        <div className='mt-4 md:w-1/2 flex items-center justify-center'>
          <img src="/skillify.png" alt="cover" className='object-cover' />
        </div>
      </div>
    </>
  );
};

export default About;
