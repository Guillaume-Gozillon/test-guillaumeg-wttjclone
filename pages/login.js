import { useState } from 'react'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import Form from '../components/Form'
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword
} from 'firebase/auth'
import { auth } from '../firebase-config'

export default function Login() {
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [user, setUser] = useState({})

  onAuthStateChanged(auth, currentUser => {
    setUser(currentUser)
  })

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      )
      console.log(user)
    } catch (error) {
      console.log(error.message)
    }
  }

  const logout = async () => {
    await signOut(auth)
  }

  return (
    <div>
      <Header />
      <SearchBar />
      <div>
        {user === null ? (
          <>
            <h1>Login</h1>
            <input
              type='email'
              placeholder='Email'
              onChange={e => setLoginEmail(e.target.value)}
            />
            <input
              type='password'
              placeholder='Password'
              onChange={e => setLoginPassword(e.target.value)}
            />
            <button onClick={login}>Login</button>
          </>
        ) : (
          <>
            <button className='bg-gray-100 p-4 m-8' onClick={logout}>
              Se déconnecter
            </button>
            <Form />
          </>
        )}
      </div>
    </div>
  )
}
