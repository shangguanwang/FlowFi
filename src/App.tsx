import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import {Layout, Home, Assets, Debt, Income, Expenses, AssetsAdd, Landing} from './views';
import { useSelector } from 'react-redux';
import { RootState } from './state/types';

function App() {
  const isLoggedIn = useSelector((state:RootState) => state.auth.isLoggedIn);

  return (
    <div className="App">
      <Router>
        <Routes>
        {/* If the user is loggedin show Layout and its children components,
        otherwise show the landing page */}
        {isLoggedIn? (
          <Route path="/" element={<Layout />}>
              <Route index element={<Home/>}/>
              <Route path="/assets" element={<Assets/>}/>
              <Route path="/assets/add" element={<AssetsAdd />}/>
              <Route path="/debt" element={<Debt/>}/>
              <Route path="/income" element={<Income/>}/>
              <Route path="/expenses" element={<Expenses/>}/>
          </Route>):
          (<Route path="/" element={<Landing />}/>)
        }
        </Routes>
      </Router>
    </div>
  );
}

export default App;
