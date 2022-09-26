import React from "react";

// function TodoTable(todos, deleteTodo){
function TodoTable(props) {

    return (
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
                        props.todos.map((todo, index) =>
                            <tr key={index} className="myTableRow">
                                <td>{todo.date}</td>
                                <td>{todo.description}</td>
                                <td>
                                    <button onClick={() => props.deleteTodo(index)}>Delete</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}

export default TodoTable;