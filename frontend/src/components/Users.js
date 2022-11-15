import React from 'react'


const UserItem = ({user}) => {
    return (
        <tr>
            <td>
                {user.username}
            </td>
            <td>
                {user.first_name}
            </td>
            <td>
                {user.last_name}
            </td>
            <td>
                {user.category}
            </td>
            <td>
                {user.email}
            </td>
        </tr>
    )
}

const UserList = ({users}) => {
    return (
        <div>
            <div className={'center-me'}> Пользователи:</div>
            <div className={'flex-row'}>
                <table>
                    <thead>
                    <tr>
                        <th>
                            Username
                        </th>
                        <th>
                            First name
                        </th>
                        <th>
                            Last Name
                        </th>
                        <th>
                            Category
                        </th>
                        <th>
                            Email
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => <UserItem user={user} key={user.id}/>)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UserList