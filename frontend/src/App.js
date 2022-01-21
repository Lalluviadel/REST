import React from 'react';
import './App.css';
import './upd.css';
import UserList from './components/Users.js';
import axios from 'axios';
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import ProjectList from "./components/Projects";
import ToDoList from "./components/ToDo";


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
                console.log(response[0].data.results)
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
                <nav className={'navbar navbar-expand'}>
                    <Menu/>
                </nav>
                <main>
                    <div className={'container-fluid'}>
                        <div className={'center-me'}> Пользователи:</div>
                        <div className={'flex-row'}>
                            <UserList users={this.state.users}/>
                        </div>
                        <div className={'center-me'}> Проекты:</div>
                        <div className={'flex-row'}>
                            <ProjectList projects={this.state.projects}/>
                        </div>
                        <div className={'center-me'}> Заметки:</div>
                        <div className={'flex-row'}>
                            <ToDoList todos={this.state.todos}/>
                        </div>
                    </div>
                </main>
                <Footer/>
            </div>
        )
    };
}


export default App;
