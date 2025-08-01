import './ArtistButton.css'
function ArtistButton ({name, onClickArtist}) {
  return <div id='container' onClick={()=>onClickArtist(name)}>
    
    <img id='prof' src={`artists/${name}/profile.jpg`} alt="artist`s profile" />
    <label id='artist-name'>{name}</label>
  </div>
}

export default ArtistButton;