//import { useState } from 'react'
import './index.css'
import './App.css'

import Banner from './Banner'
import ArtistsCadr from './artists-cadr/ArtistsCadr'
import PlayBox from './play-box/PlayBox'

function App() {

  return (
    <div id='frame' className=''>
      <div id='left-bar'>
        <Banner/>
        <ArtistsCadr/>
      </div>
      <div id='middle-bar'>
        <PlayBox/>
        <div id='albums-tab'></div> {/*can be replaced with songs-tab*/}
        
      </div>
    </div>
  )
}

export default App
