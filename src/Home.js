import React from 'react'

const Home = function({users}) {

    return (
        <div>
            <h2>Home</h2>
            <hr />
            <p>Welcome to Acme Users! We have {users.length} users!</p>
        </div>

    )
}

export default Home