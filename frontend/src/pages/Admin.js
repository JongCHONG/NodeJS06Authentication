import React, { useEffect, useState } from 'react'

const Admin = () => {
  const [users, setUsers] = useState()

  useEffect(() => {
    fetch('http://localhost:5000/admin', {
      credentials:'include'
    })
      .then(response => response.json())
      .then(data => setUsers(data))
  },[])

  if (!users) {
    return <p>Chargement...</p>
  }
  
  console.log(users)
  return (
    <div>
      <h1>Admin</h1>
      {users.map(element => <p key={element.id}>{element.username}</p>)}
    </div>
  )
}

export default Admin