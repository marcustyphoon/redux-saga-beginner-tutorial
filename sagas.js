import { put, takeEvery, all } from 'redux-saga/effects'

const delay = (ms) => new Promise(res => setTimeout(res, ms))

function* helloSaga() {
  console.log('Hello Sagas!')
}

function* runCalc() {
  let list = [];
  const core = optimizerCoreCalculate();

  while (true) {
    
    let result = core.next();
    console.log('result:', result);
    if (result.done) {
      //cleanup
      break;
    }

    if (result.value.modified) {
      console.log('changed!');
      list = result.value.list.slice();
      console.log('list:', list);
      const listString = JSON.stringify(list);
      yield put({ type: 'NEWLIST', payload: listString })
    } else {
      console.log('not changed!');
      yield put({ type: 'DONOTHING' })
    }

    
    yield delay(100);
  }
}

function* watchIncrementAsync() {
  yield takeEvery('START', runCalc)
}

function* optimizerCoreCalculate() {
  console.log('a');
  let list = [];
  let modified = false;
  for (let i = 0; i < 10; i++) {
    modified = false;
    if (Math.random() > 0.2) {
      list.push(i);
      modified = true;
      console.log('b');

    }
    yield { list, modified, i };
  }

}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    helloSaga(),
    watchIncrementAsync()
  ])
}