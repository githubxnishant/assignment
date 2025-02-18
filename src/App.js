import './App.css';
import Home from './components/Home';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Create from './components/Create'
import Update from './components/Update'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/create' element={<Create/>}></Route>
        <Route path='/edit/:name' element={<Update/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
