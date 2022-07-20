import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TodoList from '../pages/TodoList';
import TodoItem from '../pages/TodoItem';

const Main = () => {
    return (
        <main>
            <section className='main-content'>
                <div className="main-heading">
                <h1>To do list</h1>
                </div>
                <Routes>
                    <Route path='/' exact element={<TodoList />} />
                    <Route path='/task/:taskId' element={<TodoItem />} />
                </Routes>
            </section>
        </main>
    )
}

export default Main