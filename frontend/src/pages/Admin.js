import React, { useEffect, useState } from 'react'

const Admin = () => {
  const [users, setUsers] = useState()

  useEffect(() => {
    fetch('http://localhost:5000/admin', {
      credentials:'include'
    })
      .then(response => response.json())
      .then(data => console.log(data))
  },[])

  return (
    <div>
      <h1>Admin</h1>
    </div>
  )
}

export default Admin