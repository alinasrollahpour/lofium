import './PlayBox.css';
import Progress from './Progress.jsx';
import Control from './Control.jsx'

function PlayBox() {
  return <div id='play-box'>
    <div id='top'>
      <label id='current-time'>1:37/3:52</label>
      <label id='title'>The ancient forest</label>
      <Control/>
    </div>
    <Progress/>
  </div>
}

export default PlayBox;