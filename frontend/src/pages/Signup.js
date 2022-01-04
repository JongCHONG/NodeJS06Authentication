import React from 'react'

import { Formik, useFormik } from 'formik'

const Signup = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
      age: ""
    }
  })

  console.log(formik.values)
  return (
    <div>
      <h1>Sign Up</h1>
      <form>
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
          <label className="form-label">Email address</label>
          <input 
            type="email" 
            className="form-control" 
            id="email" 
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
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
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input 
            type="number" 
            className="form-control" 
            min="1"
            max="99"
            id="age"
            name="age"
            onChange={formik.handleChange}
            value={formik.values.age}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup