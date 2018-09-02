import React, {Component} from 'react'
import {HashRouter as Router, Link, Route, Switch} from 'react-router-dom'
import axios from 'axios'
import Home from './Home'
import Users from './Users'
import CreateUser from './CreateUser'
import UpdateUser from './UpdateUser'

class Main extends Component {

    constructor() {
        super()
        this.state = {
            users: []
        }
        this.deleteUser = this.deleteUser.bind(this)
        this.createUser = this.createUser.bind(this)
        this.fetchUser = this.fetchUser.bind(this)
        this.updateUser = this.updateUser.bind(this)
    }

    fetchUser(id) {
        return axios.get(`/api/users/${id}`)
            .then(response => response.data)
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

    updateUser(user) {
        return axios.put(`/api/users/${user.id}`, user)
            .then(response => response.data)
            .then(user => this.setState({
                users: this.state.users.map(_user => _user.id !== user.id ? _user : user)
            }))
    }

    componentDidMount() {
        axios.get('/api/users')
            .then(response => response.data)
            .then(users => this.setState({users}))
    }

    render() {
        const { users } = this.state
        const { deleteUser, createUser, fetchUser, updateUser } = this

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
                        <Switch>
                            <Route path='/users/create' render={({history}) => <CreateUser createUser={createUser} history={history} />} />
                            <Route path='/users/:id' render={({history, match}) => <UpdateUser fetchUser={fetchUser} updateUser={updateUser} history={history} id={match.params.id}/>} />
                        </Switch>
                    </div>
                </div>
            </Router>
        )
    }
}

export default Main