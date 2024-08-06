import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

function Nav() {
  const { loggedIn, user, logout } = useContext(UserContext)
  const navigate = useNavigate()

  async function handleLogout() {
    const resp = await fetch("/api/logout", {
      method: "DELETE"
    })

    logout()
    navigate("/")
  }

  const routes = loggedIn ? <>
      <Button color="inherit" to="/books" component={ Link }>List Books</Button>
      <Button color="inherit" to="/books/new" component={ Link }>Create Book</Button>
      <Button color="inherit" onClick={handleLogout}>Logout</Button>
      <Button color="inherit">Welcome { user.username }</Button>
    </> : <>
      <Button color="inherit" to="/signup" component={Link}>Signup</Button>
      <Button color="inherit" to="/login" component={Link}>Login</Button>
    </>

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button color="inherit" component={Link} to="/" size="large">Booktopia</Button>
          </Typography>
          { routes }
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Nav



