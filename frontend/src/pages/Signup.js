import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useFormik } from 'formik'
import * as Yup from 'yup'

const Signup = () => {
  const navigate = useNavigate()
  const [error, setError] = useState()

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      passwordConfirmation: "",
      email: "",
      age: ""
    },
    onSubmit: values => {
      const newUser = {
        ...values
      }
      fetch('http://localhost:5000/auth/signup',{
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        credentials:'include',
        body: JSON.stringify(newUser)
      })
        .then(response => {
          if (response.status >= 400) {
            throw response.statusText //si error throw pour catch en bas
          } else {
            return response.json()
          }
        })
        .then(
          data => {
            const User = {
              username: data.username,
              password: data.password
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
                  navigate('/admin')
                }
              )
            console.log(User);
          }
        )
        .catch(
          err => setError(err)
        )
    },
    validationSchema: Yup.object().shape({
			username: Yup.string()
        .min(5, "Username trop court")
        .required("Username est requis"),
			email: Yup.string()
        .min(5, "Email trop court")
				.email("Email invalid")
        .required("Email est requis"),
      password: Yup.string()
        .min(5, "Password trop court")
        .required("Password est requis"),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required("Password est requis"),
      age: Yup.string()
        .required("Age est requis")
    }),
		validateOnChange: false
  })

  console.log(formik.values)
  return (
    <div>
      <h1>Sign Up</h1>
      {error && error}
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
          {formik.errors.username && <p>{formik.errors.username}</p>}
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
          {formik.errors.email && <p>{formik.errors.email}</p>}
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
          {formik.errors.password && <p>{formik.errors.password}</p>}
        </div>
        <div className="mb-3">
          <label className="form-label">Repeat Password</label>
          <input 
            type="password" 
            className="form-control" 
            id="passwordConfirmation"
            name="passwordConfirmation"
            onChange={formik.handleChange}
            value={formik.values.passwordConfirmation}
          />
          {formik.errors.passwordConfirmation && <p>{formik.errors.passwordConfirmation}</p>}
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
          {formik.errors.age && <p>{formik.errors.age}</p>}
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup