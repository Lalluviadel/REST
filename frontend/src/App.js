import React from 'react';
import './App.css';
import './upd.css';
import UserList from './components/Users.js';
import axios from 'axios';
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import Home from "./components/Home";
import ProjectList from "./components/Projects";
import OneProjectToDoList from "./components/OneProject";
import ToDoList from "./components/ToDo";
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'


function getUsers() {
    return axios.get('http://127.0.0.1:8000/api/users');
}

function getProjects() {
    return axios.get('http://127.0.0.1:8000/api/projects');
}

function getTodos() {
    return axios.get('http://127.0.0.1:8000/api/todos/');
}

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
        }
    };


    componentDidMount() {
        axios.all([getUsers(), getProjects(), getTodos()]
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
            }).catch(error => console.log(error))
    };

    render() {
        return (
            <div>
                <BrowserRouter>
                    <nav className={'navbar navbar-expand'}>
                        <Menu/>
                    </nav>
                    <main>
                        <div className={'container-fluid'}>
                            <Routes>
                                <Route path='/users' element={<UserList users={this.state.users}/>}/>} />
                                <Route path='/todos' element={<ToDoList todos={this.state.todos}/>}/>} />
                                <Route path='/projects' element={<ProjectList projects={this.state.projects}/>}/>
                                <Route path="/project/:name" element={<OneProjectToDoList items={this.state.todos}/>}/>
                                <Route path='/home' element={<Home/>}/>
                                <Route path="/" element={<Navigate replace to="/home"/>}/>
                            </Routes>
                        </div>
                    </main>
                    <Footer/>
                </BrowserRouter>
            </div>
        )
    };
}


export default App;
