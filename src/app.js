import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import mainReducer from './reducers';
import App from './components/App';
import 'styles/index.scss';

const store = createStore(mainReducer);

const socket = new WebSocket('wss://bitlish.com/ws');

socket.onopen = () => {
  socket.onmessage = ({ data: resData }) => {
    const { data, call } = JSON.parse(resData);

    if (call !== 'trades_depth') {
      return;
    }

    const { pair_id: pairId } = data;
    const [currency, convolutedCurrency] = [pairId.slice(0, 3), pairId.slice(3, 6)];

    store.dispatch({
      type: 'FETCH_ORDERS',
      ask: data.ask,
      bid: data.bid,
      convolutedCurrency,
      currency,
    });
  };
  socket.send(JSON.stringify({
    call: 'trades_depth',
    data: {
      count: 100,
      pair_id: 'btcusd',
    },
  }));
};

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('main'),
);
