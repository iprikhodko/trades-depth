import OrderBookContainer from '../containers/OrderBook';
import ExchangeFormContainer from '../containers/ExchangeForm';

export default () => (
  <div className="container">
    <div className="row mt-3 mb-3">
      <ExchangeFormContainer />
    </div>
    <div className="row">
      <OrderBookContainer />
    </div>
  </div>
);
