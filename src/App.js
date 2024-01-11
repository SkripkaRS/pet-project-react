import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/pages/Login/Login";

function App(): React.FC {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
