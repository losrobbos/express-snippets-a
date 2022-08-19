import { useState } from 'react'
import logo from './logo.svg'
import './App.css'

const API_URL = "http://localhost:5000"

function App() {

  const onLogin = async () => {

    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "email": "rob@rob.com",
        "password": "rob123"
      }),
      // store incoming cookies
      credentials: "include"
    })

    // parse JSON data out of response 
    const data = await response.json()

    console.log(data)
  }


  // get something protected from the backend
  // => call a protected route! /protected
  const onGetProtectedData = async () => {
    const response = await fetch(`${API_URL}/protected`, {
      // include cookies in request to backend
      credentials: "include",
    });
    const data = await response.json()
    console.log(data)
  };



  return (
    <div className="App">
      <header className="App-header">
        <button onClick={onLogin}>Login</button>
        <button onClick={onGetProtectedData}>Go to protected place</button>
      </header>
    </div>
  )
}

export default App
