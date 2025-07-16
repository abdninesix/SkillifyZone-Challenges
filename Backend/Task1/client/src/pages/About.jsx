import React from 'react'
import Banner from '../componenets/Banner'

const About = () => {
  return (
    <>
    <Banner text="About This Project" />
    <div className="max-w-2xl rounded mt-10">
      <p className="text-gray-700">This project is a small web application built with tp test CRUD APIs. It allows users to register, log in, and access a variety of features.</p>
    </div>
  </>
  )
}

export default About