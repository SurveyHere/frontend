import React from 'react'
import './TermsAndCondition.css'
// import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap-icons/font/bootstrap-icons.css";
const API = import.meta.env.VITE_API_URL;


export default function TermsAndCondition() {
  return (
    <div className='terms'>
      <center><h1 className='tactit'>TERMS AND CONDITIONS</h1></center>
      <div className='UseofPlatform'>
        <h3 style={{color:'darkslateblue'}}><b>USE OF PLATFORM</b></h3>
        <p><b>Eligibility:</b>You must be at least 18 years old to use this platform.</p>
        <p><b>Prohibited Activities:</b> You agree not to use the platform for unlawful purposes, including but not limited to:</p>
        <p style={{marginLeft:'3vh'}}><i class="bi bi-arrow-right-short"></i>Spamming or unauthorized advertisements</p>
        <p style={{marginLeft:'3vh'}}><i class="bi bi-arrow-right-short"></i>Harassment or abuse of other users</p>
        <p style={{marginLeft:'3vh'}}><i class="bi bi-arrow-right-short"></i>Uploading harmful, illegal, or offensive content</p>
      </div>
      <div className='User-gene'>
      <h3 style={{color:'darkslateblue'}}><b>USER-GENERATED CONTENT</b></h3>
        <p><b>Ownership:</b>You retain ownership of the surveys and content you create. However, by submitting content, you grant us a non-exclusive, royalty-free license to use, display, and distribute it on our platform.</p>
        <p><b>Responibility:</b>You are solely responsible for the content you create or participate in. Ensure that it does not infringe on the intellectual property rights of others.</p>
      </div>
      <div className='privacy'>
      <h3 style={{color:'darkslateblue'}}><b>PRIVACY AND DATA PROTECTION</b></h3>
        <p>At <strong>Survey Here</strong> we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our platform. We may collect personal information such as your name, email address, and payment details for account creation and premium services. Additionally, we collect non-personal data, including device information, IP address, and browsing activity, to enhance user experience and ensure platform security.
        </p>
      </div>
      <div className='termination'>
      <h3 style={{color:'darkslateblue'}}><b>TERMINATION</b></h3>
        <p>You may terminate your account at any time by accessing your account settings or contacting our support team. Upon termination, your access to the platform will be revoked, and your data may be deleted based on our Data Retention Policy. We reserve the right to suspend, restrict, or terminate your account without prior notice if you violate these Terms and Conditions, engage in fraudulent, abusive, or illegal activities, or misuse the platform in a way that disrupts other users. If your account remains inactive for an extended period, we may also terminate it. Upon termination, you will lose access to your account, and any surveys, responses, or other content you created may be deleted permanently. We are not liable for any loss of data resulting from account termination.
        </p>
      </div>
    </div>
  )
}
