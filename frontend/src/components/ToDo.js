import React from 'react'
import {Link} from "react-router-dom";


const ToDoItem = ({todo, deleteToDo}) => {
    return (
        <tr>
            <td>
                {todo.project}
            </td>
            <td>
                {todo.body}
            </td>
            <td>
                {todo.created_on}
            </td>
            <td>
                {todo.updated_on}
            </td>
            <td>
                {todo.author}
            </td>
            <td>
                {todo.is_active}
            </td>
            <td>
                <button onClick={() => deleteToDo(todo.id)} type='button'>Delete</button>
            </td>
        </tr>
    )
}

const ToDoList = ({todos, deleteToDo}) => {
    return (
        <div>
            <h1>Заметки:</h1>
            <Link to='/todos/create'>
                <button>
                    <span>Новая заметка</span>
                </button>
            </Link>
            <div className={'logout'}>
                <table>
                    <thead>
                    <tr>
                        <th>
                            Проект
                        </th>
                        <th>
                            Текст заметки
                        </th>
                        <th>
                            Создан
                        </th>
                        <th>
                            Обновлен
                        </th>
                        <th>
                            Автор
                        </th>
                        <th>
                            В работе/Закрыта
                        </th>
                        <th>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {todos.map((todo) => <ToDoItem todo={todo} deleteToDo={deleteToDo}/>)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ToDoList
