
import React, { Component } from 'react'
import NavBar from './componants/NavBar'
import News from './componants/News'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  state = {
    progress: 0,
  }
  setProgress =(progress) => {
    this.setState({progress: progress});
  }
  render() {
    return (
      <div>
        <Router>
          <NavBar />
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
            // onLoaderFinished={() => setProgress(0)}
          />
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} key="general" pageSize="10" category="general" />} />
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" pageSize="10" category="entertainment" />} />
            <Route exact path="/health" element={<News setProgress={this.setProgress} key="health" pageSize="10" category="health" />} />
            <Route exact path="/science" element={<News setProgress={this.setProgress} key="science" pageSize="10" category="science" />} />
            <Route exact path="/sports" element={<News setProgress={this.setProgress} key="sports" pageSize="10" category="sports" />} />
            <Route exact path="/technology" element={<News setProgress={this.setProgress} key="technology" pageSize="10" category="technology" />} />
          </Routes>
        </Router>
      </div>
    )
  }
}

