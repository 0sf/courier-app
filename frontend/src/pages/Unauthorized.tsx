import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized: React.FC = () => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Unauthorized</h1>
      <p>You do not have permission to view this page.</p>
      <p>
        <Link to="/">Return to Home</Link>
      </p>
    </div>
  );
};

export default Unauthorized;