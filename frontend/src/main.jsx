import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path='/:artist?/:album?/:song?' element={
          <App/>
        }/>
      </Routes>
    </Router>
  </StrictMode>,
)
