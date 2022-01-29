import React from 'react'


const ToDoItem = ({todo}) => {
    let act;
    if (todo.is_active) {
        act = 'В работе'
    } else {
        act = 'Завершен'
    }
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
                {act}
            </td>
        </tr>
    )
}

const ToDoList = ({todos}) => {
    return (
        <div>
            <h1>Заметки:</h1>
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
                    </tr>
                    </thead>
                    <tbody>
                    {todos.map((todo) => <ToDoItem todo={todo}/>)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ToDoList
