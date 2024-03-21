import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, cssTransition } from 'react-toastify';
import Routers from 'src/Routers';

const Content = () => {
  const bounce = cssTransition({
    enter: 'swing-in-top-fwd',
    exit: 'swing-out-top-bck'
  });
  return (
    <>
      <Routers />
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="colored"
        transition={bounce}
      />
    </>
  );
};
export default Content;
