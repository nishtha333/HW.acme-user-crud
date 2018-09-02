import React, {Component} from 'react'

class CreateUser extends Component {

    constructor() {
        super()
        this.state = {
            name: ''
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
    }

    render() {
        const { name } = this.state
        const { handleChange, handleSubmit } = this

        return (
            <div>
                <h2>Create User</h2>
                <hr /> 
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" value={name} onChange={handleChange}/>
                    <button className="btn btn-primary" disabled={!name}>Save</button>
                </form>
            </div>

        )
    }
}

export default CreateUser