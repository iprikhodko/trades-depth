import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import OrderTable from './OrderTable';

class OrderBook extends PureComponent {
  static propTypes = {
    buyOrders: PropTypes.array.isRequired,
    sellOrders: PropTypes.array.isRequired,
    isListOverflow: PropTypes.bool.isRequired,
    isListExpanded: PropTypes.bool.isRequired,
    onToggleExpand: PropTypes.func.isRequired,
  };

  render() {
    const {
      buyOrders,
      sellOrders,
      isListOverflow,
      isListExpanded,
      onToggleExpand,
    } = this.props;

    return (
      <div className="col-md-6">
        <h3 className="h3 font-weight-normal">Orderbook</h3>
        <div className="row">
          <OrderTable
            className="col-sm-6"
            titleClassName="bid"
            title="bid (buy orders)"
            data={buyOrders}
          />
          <OrderTable
            className="col-sm-6"
            titleClassName="ask"
            title="ask (sell orders)"
            data={sellOrders}
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
