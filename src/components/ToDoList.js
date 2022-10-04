import React, { useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';


function TodoList () {
    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState({
        description: '',
        date: '',
        priority: ''
    });

    const gridRef = useRef();
    const [columnDefs] = useState([
        {field: 'description', sortable: true, filter: true, floatingFilter: true},
        {field: 'date', sortable: true, filter: true, floatingFilter: true},
        {field: 'priority',
            sortable: true,
            filter: true,
            floatingFilter: true,
            // cellStyle: params => params.value === 'High' ? {color: 'red'} : {color: 'black'}
            cellStyle: params => params.value === 'High' ? {color: 'red'} : params.value === 'Medium' ? {color: 'orange'} : {color: 'green'}
        }
    ]);
    


    const addTodo = () => {
        if (todo.description === '' || todo.date === '') {
            alert("Description and date must be defined");
            return;
        }
        setTodos([...todos, todo]);
        setTodo({
            description: '',
            date: '',
            priority: ''
        });
    };

    const deleteTodo = () => {
        if (gridRef.current.getSelectedNodes().length > 0) {
            setTodos(todos.filter((todo,index) => index !== gridRef.current.getSelectedNodes()[0].childIndex));
            return;
        }
        alert("Please select a row to delete");
        return;
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

                <label>Priority:</label>
                <input
                    type="text"
                    value={todo.priority}
                    onChange={event => setTodo({
                        ...todo,
                        priority: event.target.value
                    })}
                />

                <button onClick={addTodo}>Add</button>
                &nbsp;
                <button onClick={deleteTodo}>Delete</button>
            </fieldset>

            

            <div className="ag-theme-material" style={{ width: '35%', height: 500, margin: 'auto' }}>
                <AgGridReact
                    ref={gridRef}
                    onGridReady={params => gridRef.current = params.api}
                    rowSelection="single"
                    rowData={todos}
                    columnDefs={columnDefs}
                    animateRows={true}
                />
            </div>
        </div>
        
    );
}

export default TodoList;