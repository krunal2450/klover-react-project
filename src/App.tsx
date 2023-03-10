import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import AudienceDetails from './pages/AudienceDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="audience/:id" element={<AudienceDetails />} />
    </Routes>
  );
}

export default App;
