import React, {Component} from 'react'

class UpdateUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            error: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.fetchUser = this.fetchUser.bind(this)
        this.fetchUser(this.props.id)
    }

    fetchUser(id) {
        this.props.fetchUser(id)
            .then(user => {
                this.setState({ name: user.name })
            })
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        this.props.updateUser({id: this.props.id, name: this.state.name})
            .then(() => {
                this.props.history.push('/users')
            })
            .catch((error) => this.setState({error}))
    }

    componentDidUpdate(prevProps){
        if(prevProps.id !== this.props.id){
            this.fetchUser(this.props.id); 
        }
      }

    render() {
        const { name, error } = this.state
        const { handleChange, handleSubmit } = this

        return (
            <div>
                <h2>Update User</h2>
                <hr /> 
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" value={name} onChange={handleChange}/>
                    <button className="btn btn-primary" disabled={!name}>Update</button>
                    {!error ? "" : <div className="error">There was a problem updating the user</div>}
                </form>
            </div>
        )
    }
}

export default UpdateUser