import React from 'react';
import { ToastContainer } from 'react-toastify';
import CustomToast from './CustomToast';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/toast-custom.css';

const ToastTest = () => {
  const showSuccessToast = () => {
    CustomToast.success('Success notification!');
  };

  const showInfoToast = () => {
    CustomToast.info('Info notification!');
  };

  const showErrorToast = () => {
    CustomToast.error('Error notification!');
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Toast Notification Test</h2>
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button
          onClick={showSuccessToast}
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Show Success Toast
        </button>
        <button
          onClick={showInfoToast}
          style={{
            padding: '10px 20px',
            backgroundColor: '#17a2b8',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Show Info Toast
        </button>
        <button
          onClick={showErrorToast}
          style={{
            padding: '10px 20px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Show Error Toast
        </button>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default ToastTest;
