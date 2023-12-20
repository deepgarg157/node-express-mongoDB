import React, { useEffect, useState } from 'react'
import UserCard from './components/UserCard';
import axios from 'axios';

function App() {

  const [userData, setUserData] = useState([])
  const [userFullName, setUserFullName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')

  const newUserData = {
    fullName:{userFullName},
    email:{userEmail},
    password:{userPassword}
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData()
    }, 1000)

  }, [])

  const fetchData = async () => {
    const data = await axios.get('http://localhost:3000/users')
    setUserData(data.data.data)
  }

  const handleAddUser = () => {
    axios.post('http://localhost:3000/register', newUserData)
      .then(() => fetchData())
      .catch((error) => console.log(error.message))

      setUserFullName('')
      setUserEmail('')
      setUserPassword('')
  }

  const handelUserFullName = (e) => {
    setUserFullName(e.target.value)
  }

  const handelUserEmail = (e) => {
    setUserEmail(e.target.value)
  }

  const handelUserPassword = (e) => {
    setUserPassword(e.target.value)
  }

  return userData.length === 0 ? 'Loading the data......' : (
    <>
      <div className="App">
        {userData.map((data) => <UserCard key={data._id} userData={data} />)}
      </div>

      <div className='new-user'>
        <div className='input'>
          <input type='text' placeholder='FullName' value={userFullName} onChange={handelUserFullName}></input>
          <input type='text' placeholder='email' value={userEmail} onChange={handelUserEmail}></input>
          <input type='text' placeholder='password' value={userPassword} onChange={handelUserPassword}></input>
        </div>
        <button onClick={handleAddUser}>Add new User</button>
      </div>
    </>
  );
}

export default App;