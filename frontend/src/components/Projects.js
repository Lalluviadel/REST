import React from 'react'
import {Link} from "react-router-dom";


const ProjectItem = ({project, deleteProject}) => {
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
            <td>
                <button onClick={() => deleteProject(project.id)} type='button'>Delete</button>
            </td>
        </tr>
    )
}

function MySearch(projects) {
    const data = projects.projects
    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);
        console.log('searchTerm:', searchTerm, 'searchResults:', searchResults)
    const handleChange = event => {
        setSearchTerm(event.target.value);
    };
    React.useEffect(() => {
            const results =
               data.filter(project =>
                    project.name.toLowerCase().includes(searchTerm));
            setSearchResults(results);
    }, [searchTerm]);


    return (
        <div className="logout">
            <p className='white-text'>Найти проект: </p>
            <input
                className='field'
                type="text"
                placeholder="Название проекта"
                value={searchTerm}
                onChange={handleChange}
            />
            <ul className='white-text'>
                <p>Результат поиска по совпадениям: </p>
                {searchTerm ?
                    searchResults.map(item => (<li>{item.name}</li>)): <p> </p>}
            </ul>
        </div>
    );
}


const ProjectList = ({projects, deleteProject}) => {
    return (
        <div>
            <MySearch projects={projects}/>
            <h1>Проекты:</h1>
            <Link to='/projects/create'>
                <button>
                    <span>Новый проект</span>
                </button>
            </Link>
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
                        <th>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject}/>)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProjectList
