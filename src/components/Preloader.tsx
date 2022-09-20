import React from 'react';

import Spinner from 'react-bootstrap/Spinner';

export function Preloader() {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 vw-100">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}
