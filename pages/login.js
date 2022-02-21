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
          <div className='flex flex-col items-center bg-wttj-light-yellow'>
            <h1 className='text-2xl font-bold'>Se connecter</h1>

            <div className='flex bg-white mt-8 rounded-xl px-8 mb-8 border'>
              <input
                className='border-b outline-none'
                type='email'
                placeholder='Email'
                onChange={e => setLoginEmail(e.target.value)}
              />
              <input
                className='border-b outline-none'
                type='password'
                placeholder='Password'
                onChange={e => setLoginPassword(e.target.value)}
              />

              <button
                className='bg-wttj-yellow text-white rounded-xl hover:shadow-lg font-bold p-4 m-8'
                onClick={login}
              >
                Connexion
              </button>
            </div>
          </div>
        ) : (
          <>
            <Form />
            <div className='flex w-full justify-center'>
              <button
                className='bg-red-600 text-white rounded-xl hover:shadow-lg font-bold p-4 m-8'
                onClick={logout}
              >
                Se déconnecter
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
