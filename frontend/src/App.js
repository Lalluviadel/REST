import React from 'react';
import './App.css';
import './upd.css';
import axios from 'axios';
import Menu from "./components/Menu";
import {BrowserRouter, Link, Navigate, Route, Routes} from 'react-router-dom';
import Cookies from 'universal-cookie';
import UserList from "./components/Users";
import ToDoList from "./components/ToDo";
import ProjectList from "./components/Projects";
import OneProjectToDoList from "./components/OneProject";
import LoginForm from "./components/Auth";
import Home from "./components/Home";
import NotFound404 from "./components/NotFound";
import Footer from "./components/Footer";


class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
        }
    };

    set_token(token, username) {
        const cookies = new Cookies()
        cookies.set('token', token)
        cookies.set('username', username)
        this.setState({'token': token, 'username': username}, () => this.load_data())
    }

    is_authenticated() {
        return this.state.token !== ''
    }

    logout() {
        this.set_token('', '')
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        const username = cookies.get('username')
        this.setState({'token': token, 'username': username}, () => this.load_data())
    }

    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
            .then(response => {
                this.set_token(response.data['token'], username)

            }).catch(error => alert('Неверный логин или пароль'))
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_authenticated()) {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    load_data() {
        const axiosInstance = axios.create({
            headers: this.get_headers()
        });

        axios.all([
                axiosInstance.get('http://127.0.0.1:8000/api/users/'),
                axiosInstance.get('http://127.0.0.1:8000/api/projects/'),
                axiosInstance.get('http://127.0.0.1:8000/api/todos/')
            ],
        )
            .then(response => {
                const users = response[0].data.results
                const projects = response[1].data.results
                const todos = response[2].data.results
                this.setState(
                    {
                        'users': users,
                        'projects': projects,
                        'todos': todos
                    }
                )
            }).catch(error => {
            this.setState({todos: [], projects: [], users: []})
        })
    };

    componentDidMount() {
        this.get_token_from_storage()
    };

    render() {
        return (
            <div>
                <BrowserRouter>
                    <main>
                        <Menu/>
                        <div className={'logout'}>

                            {this.state.username ?
                                <p className={'white-text'}>Добро пожаловать, {this.state.username}</p> :
                                <p className={'white-text'}>Привет, аноним</p>}

                            {this.is_authenticated() ?
                                <button onClick={() => this.logout()}>LogOut</button> :
                                <Link to='/login'>
                                    <button>
                                        <span>LogIn</span>
                                    </button>
                                </Link>
                            }

                        </div>
                        <Routes>
                            <Route path='/users' element={<UserList users={this.state.users}/>}/>} />
                            <Route path='/todos' element={<ToDoList todos={this.state.todos}/>}/>} />
                            <Route path='/projects' element={<ProjectList projects={this.state.projects}/>}/>
                            <Route path="/project/:name" element={<OneProjectToDoList items={this.state.todos}/>}/>
                            <Route path='/home' element={<Home/>}/>


                            <Route exact path='/login' element={<LoginForm
                                get_token={(username, password) => this.get_token(username, password)}/>}/>


                            <Route path="/" element={<Navigate replace to="/home"/>}/>
                            <Route path='*' element={<NotFound404/>}/>
                        </Routes>
                    </main>
                    <Footer/>
                </BrowserRouter>
            </div>
        )
    };
}


export default App;
