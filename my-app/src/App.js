import logo from './logo.svg';
import './App.css';
import Header from './Header';

{/* <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
          hi
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div> */}

function App() {
  return (
    <div className="App">
      <Header />
      {/* Other components like main content, footer, etc. */}
    </div>
  );
}

export default App;
