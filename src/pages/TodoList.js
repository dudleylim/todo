import React from 'react'
import { useState, useEffect } from 'react'
import TodoListItem from '../components/TodoListItem';
import { Link } from 'react-router-dom';
import {AiOutlinePlusCircle} from 'react-icons/ai';

const TodoList = () => {
    const [tasks, setTasks] = useState([]);

    const AddButton = () => {
        return (
            <div className='add-button-container'>
            <Link to={'/task/new/'}>
                <button className='add-button'><AiOutlinePlusCircle size='2rem'/></button>
            </Link>
            </div>
        );
    };

    // make fetch request to api
    const getTasks = async () => {
        let response = await fetch('https://dudley-todo-app-api.herokuapp.com/api/tasks/');
        let data = await response.json();
        setTasks(data);
        console.log(data);
    }

    useEffect(() => {
        getTasks();
    }, [])

    return (
        <>
        <ul className='main-list'>
            {tasks.map((task) => {
                return <TodoListItem key={task.id} {...task} />
            })}
        </ul>
        <AddButton />
        </>
    )
}

export default TodoList