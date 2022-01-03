import React, { useState } from 'react'

import { useFormik } from 'formik'

const Login = () => {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  const formik = useFormik({
    initialValues: {
      username,
      password
    },
    onSubmit: values => {
      fetch('http://localhost:5000/auth/login',{
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        credentials:'include',
        body: JSON.stringify(values)
      })
        .then(response => response.json())
        .then(data => console.log(data))
    }
  })

  const handleUsernameChange = e => {
    setUsername(e.target.value)
  }
  const handlePasswordChange = e => {
    setPassword(e.target.value)
  }
  
  // console.log(username, password)
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Login</label>
          <input 
            type="text" 
            className="form-control" 
            id="username"
            name="username"
            onChange={handleUsernameChange}
            value={formik.values.username}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input 
            type="password" 
            className="form-control" 
            id="password"
            name="password"
            onChange={handlePasswordChange}
            value={formik.values.password}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Login