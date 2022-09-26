import React, { useState } from 'react';
import TodoTable from './TodoTable';



function TodoList () {
    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState({
        description: '',
        date: ''
    });


    const addTodo = () => {
        if (todo.description === '' || todo.date === '') {
            alert("Description and date must be defined");
            return;
        }
        setTodos([...todos, todo]);
        setTodo({
            description: '',
            date: ''
        });
    };

    const deleteTodo = (rowIndex) => {
        setTodos(todos.filter((todo, index) => index !== rowIndex));
    }


    return (
        <div>
            <div className='myTitleContainer' >
                <h1 className='myTitle' >Simple TodoList</h1>
            </div>

            <fieldset className='myFieldset'>
                <legend align="left" >Add todo:</legend>

                <label>Description:</label>
                <input
                    type="text"
                    value={todo.description}
                    onChange={event => setTodo({
                        ...todo,
                        description: event.target.value
                    })}
                />

                <label>Date:</label>
                <input
                    type="date"
                    value={todo.date}
                    onChange={event => setTodo({
                        ...todo,
                        date: event.target.value
                    })}
                />

                <button onClick={addTodo}>Add</button>
            </fieldset>

            <TodoTable todos={todos} deleteTodo={deleteTodo} />
        </div>
        
    );
}

export default TodoList;