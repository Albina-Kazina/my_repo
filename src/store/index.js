/* global window:false */

import {
    createStore,
    compose,
    combineReducers,
    applyMiddleware,
  } from 'redux';

  import thunkMiddleware from 'redux-thunk';

  import {weatherInfo} from '../store/date/reducer';

  
  const reducers = combineReducers({
    weatherInfo,
  });
  
  const enhancers = compose(
    applyMiddleware(
      thunkMiddleware,
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
  );
  
  export default createStore(reducers, enhancers);
  