import React from 'react'
import { Link } from 'react-router-dom';

export const Assets = () => {

  return (
    <div className="subpage">
      <h1>Assets</h1>
      <Link to="/assets/add">
        <button>+ Add Asset</button>
      </Link>
      <p>Net Assets: $XXX</p>
      Assets Table
    </div>
  )
}

