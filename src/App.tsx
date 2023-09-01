import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import {Layout, Home, Assets, Debt, Income, Expenses} from './views';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
              <Route index element={<Home/>}/>
              <Route path="/assets" element={<Assets/>}/>
              <Route path="/debt" element={<Debt/>}/>
              <Route path="/income" element={<Income/>}/>
              <Route path="/expenses" element={<Expenses/>}/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
