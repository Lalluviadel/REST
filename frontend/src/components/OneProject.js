import React from 'react'
import {useParams} from 'react-router-dom'

const OneToDoItem = ({item}) => {
    console.log(item.project)
    return (
        <tr>
            <td>{item.body}</td>
            <td>{item.author}</td>
            <td>{item.created_on}</td>
            <td>{item.updated_on}</td>
            <td>{item.is_active}</td>
        </tr>
    )
}

function filterBy(data, field, value) {
    return data.filter(item => item[field] === value);
}


const OneProjectToDoList = ({items}) => {

    let {name} = useParams();
    let filtered_items = filterBy(items, 'project', name);
    return (
        <div>
            <h1>TODO к проекту {name}</h1>
            <div className={'logout'}>
                <table>
                    <thead>
                    <tr>
                        <th>Текст заметки</th>
                        <th>Автор</th>
                        <th>Создан</th>
                        <th>Обновлен</th>
                        <th>В работе/завершен</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filtered_items.map((item) => <OneToDoItem item={item}/>)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default OneProjectToDoList
