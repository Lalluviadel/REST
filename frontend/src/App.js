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
import ProjectForm from "./components/ProjectForm";
import ToDoForm from "./components/ToDoForm";


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
            'Accept': 'application/json; version=2.0'
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

    deleteProject(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers: headers})
            .then(response => {
                this.setState({projects: this.state.projects.filter((item) => item.id !== id)})
            }).catch(error => console.log(error))
        window.location = '/projects/';
    }

    deleteToDo(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/todos/${id}`, {headers: headers})
            .then(response => {
                this.setState({todos: this.state.todos})
            }).catch(error => console.log(error))
        window.location = '/todos/';
    }

    createProject(name, prj_url, users) {
        const headers = this.get_headers()
        const data = {name: name, prj_url: prj_url, users: users}
        axios.post(`http://127.0.0.1:8000/api/projects/`, data, {headers: headers})
            .then(response => {
                let new_project = response.data
                new_project.users = this.state.users.filter((item) => item.id === new_project.users)[0]
                this.setState({projects: [...this.state.projects, new_project]})
            }).catch(error => console.log(error))
        window.location = '/projects/';
    }

    createToDo(body, project) {
        const headers = this.get_headers()
        const url_project = 'http://127.0.0.1:8000/api/projects/' + project + '/'
        const data = {body: body, project: url_project}
        axios.post(`http://127.0.0.1:8000/api/todos/`, data, {headers: headers})
            .then(response => {
                let new_todo = response.data
                new_todo.project = this.state.project.filter((item) => item.id === new_todo.project)[0]
                this.setState({todos: [...this.state.todos, new_todo]})
            }).catch(error => console.log(error))
        window.location = '/todos/';
    }

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
                            <Route path='/todos' element={<ToDoList todos={this.state.todos}
                                                                    deleteToDo={(id) => this.deleteToDo(id)}/>}/>
                            <Route path='/projects' element={<ProjectList projects={this.state.projects}
                                                                          deleteProject={(id) => this.deleteProject(id)}/>}/>
                            <Route path="/project/:name" element={<OneProjectToDoList items={this.state.todos}/>}/>
                            <Route path='/home' element={<Home/>}/>

                            <Route exact path='/projects/create' element={<ProjectForm all_users={this.state.users} createProject={(name, prj_url, users) => this.createProject (name, prj_url, users)} />}  />
                            <Route exact path='/todos/create' element={<ToDoForm projects={this.state.projects} createToDo={(body, project) => this.createToDo (body, project)} />}  />

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
