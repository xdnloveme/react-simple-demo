import { React, ReactDOM } from './src/React'

let count = 0;

function clickEvent (e) {
  clearIntervalTest();
  alert(`Hello World ${e.type} && interval already stop`);
}

let style = {
  color: '#ffffff',
  backgroundColor: '#900b09',
  paddingLeft: '10px'
}

function setIntervalTest () {
  const currentStyle = count % 2 === 0 ? style : {
    ...style,
    color: '#ffd700',
    backgroundColor: '#6495ed'
  }
  let demo =
  <div>
    <h1 style={currentStyle} onClick={clickEvent} id="message">Hello World</h1>
    <h2>Time: {new Date().toLocaleTimeString()}.</h2>
  </div>
  ReactDOM.render(
    demo,
    document.getElementById('root')
  );
  count++;
}

setIntervalTest();

const interval =  setInterval(setIntervalTest, 1000);

function clearIntervalTest () {
  clearInterval(interval);
  count = 0;
}