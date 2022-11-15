import React from 'react'

class LoginForm extends React.Component {


    constructor(props) {
        super(props)
        this.state = {login: '', password: ''}
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        this.props.get_token(this.state.login, this.state.password)
        event.preventDefault()
    }

    render() {
        return (
            <div className={'main-block'}>
                <form className={'row'} onSubmit={(event) => this.handleSubmit(event)}>
                    <div className="col">
                        <input type="text" className={'form-control'} name="login" placeholder="login"
                               value={this.state.login}
                               onChange={(event) => this.handleChange(event)}/>
                    </div>
                    <div className="col">
                        <input type="password" name="password" placeholder="password" value={this.state.password}
                               onChange={(event) => this.handleChange(event)}/>
                    </div>
                    <div className="col">
                        <button type="submit">
                            <span>LogIn</span>
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default LoginForm
