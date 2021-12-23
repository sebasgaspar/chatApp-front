import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { Chat, Login, SingleChat } from './Pages';
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Loading } from './Atoms';
import { isLoggin } from './Utils/Functions/functions';

import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Loading />
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route element={<RequireAuth />}>
          <Route path="/chat" element={<Chat />}></Route>
          <Route path="/singlechat" element={<SingleChat />}></Route>
        </Route>
      </Routes>
    </Provider>
  );
}

function RequireAuth() {
  let auth = isLoggin();
  if (!auth) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
}

export default App;
