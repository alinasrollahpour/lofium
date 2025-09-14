import './Progress.css'

function Progress () {
  return <div id='progress-container'>
    <button id='seek'></button>
    <div id='total'>
      <div id='passed'></div>
    </div>
  </div>
}
export default Progress;