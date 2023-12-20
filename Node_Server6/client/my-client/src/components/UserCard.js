import React from 'react'

const UserCard = ({userData})=>{

    const {fullName, email, password, isPremium} = userData

    return(
        <div className='user-info'>
            <div className='data'>
                <p className='id-card'>ID Card</p>
               <p>FullName: {fullName}</p>
               <p>email: {email}</p>
               <p>password: {password}</p>
               <p>isPremium: {isPremium.toString()}</p>
            </div>
        </div>
    )
}

export default UserCard;