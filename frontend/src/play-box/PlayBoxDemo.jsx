import {useParams} from 'react-router-dom';
import "./PlayBoxDemo.css"

const backendDomain = import.meta.env.VITE_BACKEND_DOMAIN;

function PlayBoxDemo() {
  const {artist, album, song} = useParams();

  return <div id="demo-container">
    {
      (artist && album && song)?
        <audio id="main-audio" controls src={`${backendDomain}/lib/${artist}/${album}/${song}`}/>
        :
        <p>Click a song to play it</p>
    }

  </div>
}

export default PlayBoxDemo;