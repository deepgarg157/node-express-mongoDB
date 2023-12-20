import React, { useEffect, useState } from 'react'
import UserCard from './components/UserCard';
import axios from 'axios';

function App() {

  const [userData, setUserData] = useState([])

  useEffect(() => {
    fetchData()
  }, [userData])

  const fetchData = async () => {
    const data = await axios.get('http://localhost:3000/users')
    setUserData(data.data.data)
  }

  return userData.length === 0 ? 'Loading the data......' : (
    <div className="App">
      {userData.map((data) => <UserCard key={data._id} userData={data} />)}
    </div>
  );
}

export default App;