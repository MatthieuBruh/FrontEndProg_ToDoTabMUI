import React, { useState } from 'react';



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

            <div>
                <table className='myTable' >
                    <thead>
                        <tr>
                            <td className='myTableRowHead'>Date</td>
                            <td className='myTableRowHead'>Description</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        todos.map((todo, index) =>
                            <tr key={index} className="myTableRow">
                                <td>{todo.date}</td>
                                <td>{todo.description}</td>
                                <td>
                                    <button onClick={() => {
                                        setTodos([...todos.filter((todo, i) => i !== index)])
                                    }}>Delete</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody></table>
            </div>
        </div>
        
    );
}

export default TodoList;