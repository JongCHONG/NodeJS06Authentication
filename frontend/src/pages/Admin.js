import React, { useEffect, useState } from 'react'

const Admin = () => {
  const [users, setUsers] = useState("")

  useEffect(() => {
    fetch('http://localhost:5000/admin', {
      credentials:'include'
    })
      .then(response => response.json())
      .then(data => setUsers(data))
  },[])

  // console.log(users)
  return (
    <div>
      <h1>Admin</h1>
      {users && 
        users.map(element => element.username)
      }
    </div>
  )
}

export default Admin