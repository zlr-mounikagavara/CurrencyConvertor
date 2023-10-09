
import { Divider } from '@mui/material';
import './App.css';
import Convertor from './components/Convertor';
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header></Header>
     
      <Convertor></Convertor>
    </div>
  );
}

export default App;
