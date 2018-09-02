import React from 'react'
import {Link} from 'react-router-dom'

const Users = function({users, deleteUser}) {

    return (
        <div>
            <h2>Users</h2>
            <hr />
            {
                users.map(user => 
                    <div key={user.id}>
                        <Link to={`users/${user.id}`}>{user.name}</Link>
                        <button type="button" className="btn btn-danger" onClick={() => deleteUser(user.id)}>x</ button>
                    </div>
            )}
        </div>

    )
}

export default Users