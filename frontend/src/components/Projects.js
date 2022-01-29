import React from 'react'
import {Link} from "react-router-dom";


const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>
                <Link to={`/project/${project.name}`}>{project.name}</Link>
            </td>
            <td>
                {project.prj_url}
            </td>
            <td>
                {project.users}
            </td>
        </tr>
    )
}

const ProjectList = ({projects}) => {
    return (
        <div>
            <h1>Проекты:</h1>
            <div className={'logout'}>
                <table>
                    <thead>
                    <tr>
                        <th>
                            Название
                        </th>
                        <th>
                            Ссылка
                        </th>
                        <th>
                            Участники
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {projects.map((project) => <ProjectItem project={project}/>)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProjectList
