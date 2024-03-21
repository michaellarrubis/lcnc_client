import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Content from '@baseComponents/Content';
import { persistor, store } from 'src/store';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Content />
      </PersistGate>
    </Provider>
  );
};

export default App;
