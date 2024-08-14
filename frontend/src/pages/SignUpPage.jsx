import React from 'react'
import Navbar from '../components/Navbar'
import SignUp from '../components/SignUp'
import Footer from '../components/Footer';

function SignUpPage() {
  return (
    <>
      <Navbar/>
      <div className="min-h-screen">
      <SignUp/>
      </div>
      <Footer/>
    </>
  )
}

export default SignUpPage;
