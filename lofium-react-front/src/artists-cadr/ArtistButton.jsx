import './ArtistButton.css'
function ArtistButton ({name}) {
  return <div id='container'>
    
    <img id='prof' src={`artists/${name}/profile.jpg`} alt="artist`s profile" />
    <label id='artist-name'>{name}</label>
  </div>
}

export default ArtistButton;