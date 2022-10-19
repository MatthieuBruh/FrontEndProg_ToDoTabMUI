import React, { useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Snackbar from '@mui/material/Snackbar';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

function TodoList () {
    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState({
        description: '',
        date: new Date(),
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
    const [open, setOpen] = useState(false); // For the SnackBar


    const addTodo = () => {
        if (todo.description === '' || todo.date === '') {
            alert("Description and date must be defined");
            return;
        }
        todo.date = todo.date.toISOString().substring(0, 10);
        setTodos([...todos, todo]);
        setTodo({
            description: '',
            date: new Date(),
            priority: ''
        });
    };

    const deleteTodo = () => {
        if (gridRef.current.getSelectedNodes().length > 0) {
            setTodos(todos.filter((todo,index) => index !== gridRef.current.getSelectedNodes()[0].childIndex));
            setOpen(true);
            return;
        }
        alert("Please select a row to delete");
        return;
    }

    const changeDate = (newValue) => {
        setTodo({
            ...todo,
            date: newValue
        });
    }


    return (
        <div>

            <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent="center">

                <TextField
                    variant="standard"
                    type="text"
                    label="Description"
                    value={todo.description}
                    onChange={event => setTodo({
                        ...todo,
                        description: event.target.value
                    })}
                />

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        views={['year', 'month', 'day']}
                        label="Year, Month and Day"
                        minDate={new Date('2012-03-01')}
                        maxDate={new Date('2023-06-01')}
                        value={todo.date}
                        onChange={(newValue) => {
                        changeDate(newValue);
                        }}
                        renderInput={ (props) =>
                            <TextField  {...props} size='small' helperText={null}/>}
                    />
                </LocalizationProvider>

                <TextField
                    variant="standard"
                    type="text"
                    label="Priority"
                    value={todo.priority}
                    onChange={event => setTodo({
                        ...todo,
                        priority: event.target.value
                    })}
                />

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={addTodo}>Add
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    onClick={deleteTodo}
                    startIcon={<DeleteIcon />}>Delete
                </Button>
            </Stack>

            

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

            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                message="To do deleted successfully"
            />
        </div>
        
    );
}

export default TodoList;