import { useContext} from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { headers } from '../../Globals'
import { UserContext } from '../../context/UserContext'

const Signup = () => {

  const { login } = useContext(UserContext)

  const initialValues = {
    username: "",
    password: ""
  }

  const validationSchema = yup.object({
    username: yup.string().required(),
    password: yup.string().required()
  })

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async function(values) {
      // fetch to back end and signup
      const resp = await fetch("/api/signup", {
        method: "POST",
        headers,
        body: JSON.stringify(values)
      })
      const user = await resp.json()
      login(user)
    }
  })

  return (
    <div>
      <h1>Create Account</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="username">Username: </label>
          <input type="text" name="username" id="username" 
            value={formik.values.username} onChange={formik.handleChange} />
        </div><br />
        <div>
          <label htmlFor="password">Password: </label>
          <input type="password" name="password" id="password" 
            value={formik.values.password} onChange={formik.handleChange} />
        </div><br />
        <input type="submit" value="Signup" />
      </form>
    </div>
  )
}

export default Signup