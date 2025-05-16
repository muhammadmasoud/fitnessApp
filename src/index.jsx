import { Fragment } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App.jsx';

import { ModalProvider } from './contexts/ModalContext';
import { FormProvider } from './contexts/FormContext';
import { NotificationProvider } from './contexts/NotificationContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/toast-custom.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <NotificationProvider>
        <FormProvider>
          <ModalProvider>
            <Fragment>
              <App />
              <ToastContainer />
            </Fragment>
          </ModalProvider>
        </FormProvider>
      </NotificationProvider>
    </BrowserRouter>
  </Provider>
);