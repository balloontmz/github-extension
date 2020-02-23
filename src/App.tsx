import React from 'react';
// import logo from './logo.svg';
import './App.css';

import {
  MemoryRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import { Page } from './Page'


// class ButtonPage extends React.Component {
//   firstClick() {
//     console.log('点击第一个按钮')
//   }

//   secondClick() {
//     console.log('点击第二个按钮')
//   }

//   render() {
//     return (
//       <div>
//         <button onClick={() => this.firstClick()}>点击按钮</button>
//         <button onClick={() => this.secondClick()}>第二个按钮</button>
//       </div>
//     );
//   }
// }

//https://itnext.io/create-chrome-extension-with-reactjs-using-inject-page-strategy-137650de1f39
function App() {
  // const history = createMemoryHistory()
  return (
    <Router >
      <Switch>
        <Route path="/def">
          <div>Hello world</div>
          <Link to={`/`}>Home</Link>
        </Route>
        <Route path="/">
          <Page></Page>
        </Route>
      </Switch>

    </Router >
  );
}

export default App;
