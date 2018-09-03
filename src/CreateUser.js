import React, {Component} from 'react'

class CreateUser extends Component {

    constructor() {
        super()
        this.state = {
            name: '',
            error: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        this.props.createUser({name: this.state.name})
            .then(() => {
                this.props.history.push('/users')
            })
            .catch((error) => this.setState({error}))
    }

    render() {
        const { name, error } = this.state
        const { handleChange, handleSubmit } = this

        return (
            <div>
                <h2>Create User</h2>
                <hr /> 
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" value={name} onChange={handleChange}/>
                    <button className="btn btn-primary" disabled={!name}>Save</button>
                    {!error ? "" : <div className="error">There was a problem creating the user</div>}
                </form>
            </div>

        )
    }
}

export default CreateUser