import React from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './components/Main';
import Secret from './components/Secret';
import NotFound from './components/NotFound';
import Callback from './components/Callback';

class App extends React.Component {
  render() {
    let mainComponent = "";
    switch(this.props.location) {
      case "":
        mainComponent = <Main {...this.props} />;
        break;
      case "callback":
        mainComponent = <Callback />
        break;
      case "secret":
        mainComponent = this.props.auth.isAuthenticated() ? <Secret {...this.props} /> : <NotFound />;
        break;
      default:
        mainComponent = <NotFound />;
    };

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Welcome {this.props.name}
          </p>
        </header>
        {mainComponent}
      </div>
    );
  }
}

export default App;
