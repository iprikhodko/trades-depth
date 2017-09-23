import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import OrderTable from '../containers/OrderTable';

class OrderBook extends PureComponent {
  static propTypes = {
    isListOverflow: PropTypes.bool.isRequired,
    isListExpanded: PropTypes.bool.isRequired,
    onToggleExpand: PropTypes.func.isRequired,
  };

  render() {
    const {
      isListOverflow,
      isListExpanded,
      onToggleExpand,
    } = this.props;

    return (
      <div className="col-md-6">
        <h3 className="h3 font-weight-normal">Orderbook</h3>
        <div className="row">
          <OrderTable
            id="buyOrders"
            className="col-sm-6"
            titleClassName="bid"
            title="bid (buy orders)"
          />
          <OrderTable
            id="sellOrders"
            className="col-sm-6"
            titleClassName="ask"
            title="ask (sell orders)"
          />
        </div>
        {isListOverflow && <div className="text-center">
          <button className="btn btn-secondary" type="button" onClick={onToggleExpand}>
            {isListExpanded ? 'Collapse' : 'Expand'}
          </button>
        </div>}
      </div>
    );
  }
}

export default OrderBook;
