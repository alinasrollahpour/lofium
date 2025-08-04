import './EachSong.css'

function EachSong({artistName, albumName, songName, index}) {
  return <div id="song-container">
    <label id="song-index">{index}</label>
    {songName}
  </div>
}
export default EachSong;