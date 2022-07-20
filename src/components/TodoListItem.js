import React from 'react'
import { Link } from 'react-router-dom'

const TodoListItem = ({id, body, updated, created}) => {
    let title = body.split('\n')[0];

    if (title.length > 20) {
        title = title.slice(0, 20) + "...";
    }

    return (
        <Link to={`/task/${id}/`}>
        <li className='main-list-item'>
            <p>{title}</p>
            <div className='main-list-item-sub'>
                <p>Updated: {updated.slice(0, 10)} --- Created: {created.slice(0, 10)}</p>
            </div>
        </li>        
        </Link>
    )
}

export default TodoListItem