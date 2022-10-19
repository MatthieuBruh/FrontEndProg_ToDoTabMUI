import './App.css';
import TodoList from './components/ToDoList';
import Home from './components/Home';
import { Box, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';


function App() {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  return (
    <div className="App">
      <Box>
        <Tabs value={tabIndex} onChange={handleTabChange}>
          <Tab label="Home" />
          <Tab label="Todos" />
        </Tabs>
      </Box>

      {tabIndex === 0 && <Home />}

      {tabIndex === 1 && <TodoList />}
    </div>
  );
}

export default App;
