import React from 'react'
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const TodoItem = () => {
    const [task, setTask] = useState({});
    const {taskId} = useParams();
    const navigate = useNavigate();

    const deleteTask = async () => {
        await fetch(`https://dudley-todo-app-api.herokuapp.com/api/tasks/${taskId}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        setTimeout(() => {navigate('/');}, 100);
    };

    const updateTask = async () => {
        await fetch(`https://dudley-todo-app-api.herokuapp.com/api/tasks/${taskId}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
    };

    const createTask = async () => {
        await fetch('https://dudley-todo-app-api.herokuapp.com/api/tasks/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
    };

    useEffect(() => {
        // if task is new, do not getTask because it will fetch nothing
        const getTask = async () => {
            let response = await fetch(`https://dudley-todo-app-api.herokuapp.com/api/tasks/${taskId}/`);
            let data = await response.json();
            setTask(data);
            console.log(data);
        };
        if (taskId !== 'new') {
            getTask();
        }
    }, [taskId])

    const handleSubmit = () => {
        if (taskId !== 'new' && (task.body === undefined || task.body === '')) {
            // delete task if body is empty
            deleteTask();
        } else if (taskId !== 'new') {
            // update task if task is not new
            updateTask();
        } else if (taskId === 'new' && (task.body !== undefined && task.body !== '')) {
            // create task if task is new and body is not empty
            createTask();
        }
        // in this logic, if user attempts to create task without body, it wont run any request methods and just navigate back

        // navigate back; might need to add setTimeout
        setTimeout(() => {navigate('/');}, 100);
    };

    return (
        <article className='main-item-details'>
            <div className='main-item-buttons'>
                <button onClick={() => {handleSubmit()}} className='generic-button'>
                    {taskId === 'new' ? 'Done' : 'Back'}
                </button>
                {taskId !== 'new' && <button onClick={() => {deleteTask()}} className='generic-button'>Delete</button>}
            </div>
            <textarea value={task.body} onChange={(e) => {setTask({...task, 'body': e.target.value})}} className='item-text'></textarea>
        </article>
    )
}

export default TodoItem