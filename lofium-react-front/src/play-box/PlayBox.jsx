import './PlayBox.css';
import Control from './Control.jsx'

function PlayBox() {
  return <div id='play-box'>
    <div id='top'>
      <label id='seek'>1:37/3:52</label>
      <label id='title'>The ancient forest</label>
      <Control/>
    </div>
    <div id='progress'></div>
  </div>
}
export default PlayBox;