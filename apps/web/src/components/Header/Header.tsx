import React from 'react'

function Header() {
  return (
    <>
     <header style={{ textAlign: "center", margin: "2rem auto"}}>
      <h1>Welcome to Santa&#39;s Letter Analyzer! 🎅</h1>
      <p>
        <strong>Simply upload a picture of your letter to Santa, and we&#39;ll do the rest:</strong>
      </p>
      <ul>
        ✍️ <strong>Typed Version:</strong> Receive a clear, typed copy of your letter.
        </ul>
        <ul>
        🎁 <strong>Gift List:</strong> An itemized list of all the gift requests mentioned.
        </ul>
      <p>
        Get started by entering the picture URL below and let the holiday magic begin! 🌟
      </p>
    </header>
    </>
  )
}

export default Header;