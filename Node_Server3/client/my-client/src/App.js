import React, { useEffect, useState } from "react";
import axios from 'axios'

function App() {

  const [users, setUsers] = useState([])

  useEffect(() => {
    fetchUsers()
  }, [])

  // New user data should be fetched from a form
  const dummyUser = {
    firstName: 'Lakshman',
    lastName: 'Pandey',
    phone:123
  }

  const fetchUsers = () => {
    axios.get('http://localhost:3000/users')
      .then((response) => setUsers(response.data.message))
      .catch((error) => console.log(error))
  }

  const createNewUser = () => {
    axios.post('http://localhost:3000/users', dummyUser)
      .then((response) => fetchUsers())
      .catch((error) => console.log(error))
  }

  return users.length === 0 ? "Loading............." : (
    <>
      <div className="App" style={{ border: '2px solid black', width: '200px', textAlign: 'center' }}>
        {users.map((userInfo) => <p key={userInfo.id}>{userInfo.firstName + " " + userInfo.lastName}</p>)}
      </div>
      <div>
        <button style={{ margin: '5px', cursor: 'pointer' }} onClick={createNewUser}>Add more data</button>
      </div>
    </>
  );
}

export default App;
