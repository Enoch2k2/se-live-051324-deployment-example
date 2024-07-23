import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'


const Nav = () => {

  const { loggedIn, user, logout } = useContext(UserContext)

  async function handleLogout() {
    const resp = await fetch("/api/logout", {
      method: "DELETE"
    })

    logout()
  }

  const routes = loggedIn ? <>
      <li><Link to="/books">List Books</Link></li>
      <li><Link to="/books/new">Create Book</Link></li>
      <li><Link to="#" onClick={handleLogout}>Logout</Link></li>
      <li>Welcome { user.username }</li>
    </> : <>
      <li><Link to="/signup">Signup</Link></li>
      <li><Link to="/login">Login</Link></li>
    </>

  return (
    <ul>
      <li><Link to="/">Home</Link></li>
      { routes }
      
    </ul>
  )
}

export default Nav