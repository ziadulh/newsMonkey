
import React, { Component } from 'react'
import NavBar from './componants/NavBar'
import News from './componants/News'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <NavBar />
          <Routes>
            <Route exact path="/" element={<News key="general" pageSize="20" category="general" />} />
            <Route exact path="/entertainment" element={<News key="entertainment" pageSize="20" category="entertainment" />} />
            <Route exact path="/health" element={<News key="health" pageSize="20" category="health" />} />
            <Route exact path="/science" element={<News key="science" pageSize="20" category="science" />} />
            <Route exact path="/sports" element={<News key="sports" pageSize="20" category="sports" />} />
            <Route exact path="/technology" element={<News key="technology" pageSize="20" category="technology" />} />
          </Routes>
        </Router>
      </div>
    )
  }
}

