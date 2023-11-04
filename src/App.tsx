import { RouterProvider } from 'react-router-dom';
import { router } from './utils/const';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
