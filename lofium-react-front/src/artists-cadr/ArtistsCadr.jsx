import './ArtistsCadr.css'
import '../styles/cadr.css'
import {artists} from '../../data.js'
import ArtistButton from './ArtistButton.jsx'

function ArtistsCadr () {
    return <div id='artists-cadr' className='cadr'>
      <label id='cadr-title'>ARTISTS</label>

      <ul>
        {artists.map( (artist) => <li key={artist}><ArtistButton name={artist}/></li> )}
      </ul>
    </div>
}

export default ArtistsCadr;