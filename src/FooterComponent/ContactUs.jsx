import React from 'react'
import './ContactUs.css'
const API = import.meta.env.VITE_API_URL;
export default function ContactUs() {
  return (
    <div className='contactUs-page'>
      <center><h1 className='contit'>CONTACT US</h1></center>
      <center><h3 className='quote'>Your thoughts matter—let’s talk!</h3></center>
      <div className='contact-flex'>
        <div className='contact-img'>
          <img  className='image' src='https://img.freepik.com/free-vector/flat-design-illustration-customer-support_23-2148887720.jpg?t=st=1740384254~exp=1740387854~hmac=014eeed1cbd750feb5c17d1c8ecdebd337c78cf66cb51be2aff3b460957ee959&w=900'
          alt='Contact us img'/>
        </div>
        <div className='contact-info'>
         <div className='call'>
          <h3><i class="bi bi-telephone-fill"></i>  Call Us</h3>
          <h3>+91 9874561230</h3>
         </div>
         <div>
          <h3><i class="bi bi-envelope-fill"></i>   Mail Us</h3>
          <h3>surveyhereadmin@gmail.com</h3>
         </div>
         <div>
          <h3><i class="bi bi-building-fill"></i>   Communication Address</h3>
          <h3>Karpagam College of Engineering,Myleripalayam Village, Othakkal Mandapam, Tamil Nadu 641032</h3>
         </div>
        </div>
      </div>
    </div>
  )
}
