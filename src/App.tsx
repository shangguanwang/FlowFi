import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import {Layout, Home, Assets, Debt, Income, Expenses, AssetsAdd, Landing} from './views';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="landing" element={<Landing />}/>
          <Route path="/" element={<Layout />}>
              <Route index element={<Home/>}/>
              <Route path="/assets" element={<Assets/>}/>
              <Route path="/assets/add" element={<AssetsAdd />}/>
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
