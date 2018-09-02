import React, {Component} from 'react'
import {HashRouter as Router, Link, Route} from 'react-router-dom'
import axios from 'axios'
import Home from './Home'
import Users from './Users'
import CreateUser from './CreateUser'

class Main extends Component {

    constructor() {
        super()
        this.state = {
            users: []
        }
        this.deleteUser = this.deleteUser.bind(this)
        this.createUser = this.createUser.bind(this)
    }

    deleteUser(id) {
        axios.delete(`/api/users/${id}`)
            .then(() => this.setState({
                    users: this.state.users.filter(user => user.id !== id)
                }))
    }

    createUser(user) {
        return axios.post(`/api/users`, user)
            .then(response => response.data)
            .then(user => this.setState({
                users: [...this.state.users, user]
            }))
    }

    componentDidMount() {
        axios.get('/api/users')
            .then(response => response.data)
            .then(users => this.setState({users}))
    }

    render() {
        const { users } = this.state
        const { deleteUser, createUser } = this

        return (
            <Router>
                <div id="main">
                    <div id="btn-group" >
                        <Link to="/">
                            <button type="button" className="btn btn-primary">Home</ button>
                        </Link>
                        <Link to="/users">
                            <button type="button" className="btn btn-primary">Users ({users.length})</ button>
                        </Link>
                        <Link to="/users/create">
                            <button type="button" className="btn btn-primary">Add A User</ button>
                        </Link>
                    </div>
                    <br />
                    <div>
                        <Route exact path='/' render={() => <Home users={users} />} />
                        <Route path='/users' render={() => <Users users={users} deleteUser={deleteUser} />} />
                        <Route path='/users/create' render={({history}) => <CreateUser createUser={createUser} history={history} />} />
                    </div>
                </div>
            </Router>
        )
    }
}

export default Main