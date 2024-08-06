import { useEffect, useState, useContext } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { BookContext } from '../../context/BookContext'
import { TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material'

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
      addBook(values)
    }
  })

  const authorOptions = authors.map(author => <MenuItem key={ author.id } value={ author.id }>{ author.name }</MenuItem>)

  return (
    <div>
      <h1>Create Book</h1>
      <form onSubmit={ formik.handleSubmit }>
        <div>
          <TextField name="title" id="title" label="title" variant="outlined" value={ formik.values.title } onChange={ formik.handleChange } />
          { formik.errors.title ? <p style={{ color: "red"}}>{ formik.errors.title}</p> : null }
        </div><br />
        <div>
          <FormControl sx={{ minWidth: 144 }}>
            <InputLabel id="released">Released</InputLabel>
            <Select
              labelId="released"
              id="released"
              label="Released"
              name="released"
              value={ formik.values.released } onChange={ formik.handleChange }
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </FormControl>
        </div><br />
        <div>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="released">Released</InputLabel>
            <Select
              labelId="author_id"
              id="author_id"
              label="author_id"
              name="author_id"
              value={ formik.values.author_id } onChange={ formik.handleChange }
            >
              {authorOptions}
            </Select>
          </FormControl>
        </div><br />
        <Button type="submit" variant="contained">Create Book</Button>
      </form>
    </div>
  )
}

export default BookForm