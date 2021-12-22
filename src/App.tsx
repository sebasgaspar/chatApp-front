import { Route, Routes } from 'react-router-dom';
import { Chat, Login } from './Pages';
import { Provider } from "react-redux";
import { store } from "./redux/store";

import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/chat" element={<Chat />}></Route>
      </Routes>
    </Provider>
  );
}

export default App;
