import React from 'react'
import '../App.css';

class Menu extends React.Component {
    render() {
        let links = [
            'Home',
            'TODOs',
            'Projects',
            'Users',
        ]
        return (<ul className={'navbar'}>
            {links.map((value, index) => {
                return (<li className={'navbar__item'} key={index}>
                    <Link value={value}/>
                </li>)
            })}
            </ul>
        )}
}

class Link extends React.Component {
    render() {
        const url = '/' + this.props.value.toLowerCase().trim().replace(' ', '-')
        return <div>
            <a href={url}>
                {this.props.value}
            </a>
        </div>
    }
}

export default Menu
