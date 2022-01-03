import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'

import { useFormik } from 'formik'

const Login = () => {
  // const navigate = useNavigate()
  const [error, setError] = useState(null)

  const formik = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    onSubmit: values => {
      const User = {
        ...values
      }

      fetch('http://localhost:5000/auth/login',{
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        credentials:'include',
        body: JSON.stringify(User)
      })
        .then(response => response.json())
        .then(
          data => {
            console.log(data)
            setError("")
          },
          err => {
            setError(err)
          }
        )
        // .then(
        //   // () => navigate('/admin')
        // ) 
    }
  })
  
  // console.log(formik.values)
  return (
    <div>
      <h1>Login</h1>
      {error && "User Not Found"}
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input 
            type="text" 
            className="form-control" 
            id="username"
            name="username"
            onChange={formik.handleChange}
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
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Login