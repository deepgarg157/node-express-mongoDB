import React, { useEffect, useState } from "react";

const userData = {
  id: 1,
  firstName: 'Deepanshu',
  lastName: 'Garg',
  age: 27,
  email: 'deepgarg123@gmail.com'
}

function App() {

  const [user, setUser] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const data = await fetch('http://localhost:3000/users')
    const result = await data.json()
    setUser(result)
  }

  const userData = user.message
  console.log(userData)

  return  user.length === 0 ? "Loading" : (
    <div className="App" style={{ border: '2px solid black', width: '200px', textAlign: 'center' }}>
      {userData.map((userInfo)=> <p key={userInfo.id}>{userInfo.firstName + " " + userInfo.lastName}</p>)}
    </div>
  );
}

export default App;
