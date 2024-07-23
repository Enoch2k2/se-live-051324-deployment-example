import { createContext, useState, useEffect } from "react";

const UserContext = createContext({})

function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)

  function login(user) {
    setUser(user)
    setLoggedIn(true)
  }

  function logout() {
    setUser(null)
    setLoggedIn(false)
  }

  useEffect(() => {
    async function loadUser() {
      const resp = await fetch("/api/check-session")
      if (resp.status == 200) {
        const user = await resp.json()
        login(user)
      }

    }
    loadUser()
  }, [])

  return <UserContext.Provider value={{ user, loggedIn, login, logout }}>{ children }</UserContext.Provider>
}

export { UserContext, UserProvider }