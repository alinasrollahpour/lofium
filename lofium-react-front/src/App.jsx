//import { useState } from 'react'
import './index.css'
import './App.css'

import Banner from './Banner'
import ArtistsCadr from './artists-cadr/ArtistsCadr'

function App() {

  return (
    <div id='frame' className=''>
      <div id='left-bar'>
        <Banner/>
        <ArtistsCadr/>
      </div>
      
    </div>
  )
}

export default App
