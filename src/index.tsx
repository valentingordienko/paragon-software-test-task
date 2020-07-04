import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import {buttons} from "./model/config";
import * as serviceWorker from './serviceWorker';

/* Проверка выполняется здесь для улучшения UX
 * В том случае если функциональность геолокации отсутствует в браузере, пользователь сразу же увидит предупреждение
 * и приложение не будет лишний раз выполнять не нужную логику.
 */
const geolocationApi: Geolocation = navigator.geolocation;

ReactDOM.render(
  <React.StrictMode>
    <App geolocationApi={geolocationApi} buttons={buttons}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
