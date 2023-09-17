import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import {Layout, Home, Assets, Debt, Goals, Expenses, AssetsAdd, Landing, Register} from './views';
import AssetsEdit from './views/AssetsEdit';
import DebtAdd from './views/Debt/DebtAdd';
import DebtEdit from './views/Debt/DebtEdit';
import GoalsAdd from './views/Goals/GoalsAdd';

function App() {
  //const isLoggedIn = useSelector((state:RootState) => state.auth.isLoggedIn); // comment out for now
  const isLoggedIn = true;
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
              <Route path="/assets/edit/:id" element={<AssetsEdit />}/>
              <Route path="/debt" element={<Debt/>}/>
              <Route path="debt/add" element={<DebtAdd />}/>
              <Route path="debt/edit/:id" element={<DebtEdit />}/>
              <Route path="/goals" element={<Goals/>}/>
              <Route path="/goals/add" element={<GoalsAdd />}/>
              <Route path="/expenses" element={<Expenses/>}/>
          </Route>):
          (<>
          <Route path="/" element={<Landing />}/>
            <Route path="/register" element={<Register />}/>
            </> )
        }
        </Routes>
      </Router>
    </div>
  );
}

export default App;
