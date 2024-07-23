import { useEffect, useState, useContext } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { BookContext } from '../../context/BookContext'

const BookForm = () => {
  const [ authors, setAuthors ] = useState([])

  const { addBook } = useContext(BookContext)

  const initialValues = {
    title: "",
    author_id: 1,
    released: true
  }

  const validationSchema = yup.object({
    title: yup.string().min(5).required(),
    released: yup.boolean().required()
  })

  useEffect(() => {
    const loadAuthors = async () => {
      const resp = await fetch("/api/authors")
      const data = await resp.json()
      setAuthors(data)
    }

    loadAuthors()
  }, [])

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: function(values) {
      addBook({
        ...values,
        released: values.released == "false" ? false : true
      })
    }
  })

  const authorOptions = authors.map(author => <option key={ author.id } value={ author.id }>{ author.name }</option>)

  return (
    <div>
      <h1>Create Book</h1>
      <form onSubmit={ formik.handleSubmit }>
        <div>
          <label htmlFor="title">Title: </label>
          <input type="text" name="title" id="title" value={ formik.values.title } onChange={ formik.handleChange } />
          { formik.errors.title ? <p style={{ color: "red"}}>{ formik.errors.title}</p> : null }
        </div><br />
        <div>
          <label htmlFor="released">released: </label>
          <select name="released" id="released" value={ formik.values.released } onChange={ formik.handleChange }>
            <option value={true}>Yes</option>
            <option value={false}>no</option>
          </select>
        </div><br />
        <div>
          <label htmlFor="author_id">Author: </label>
          <select name="author_id" id="author_id" value={formik.values.author_id} onChange={ formik.handleChange }>
            {authorOptions}
          </select>
        </div><br />
        
        <input type="submit" value="Create Book" />
      </form>
    </div>
  )
}

export default BookForm