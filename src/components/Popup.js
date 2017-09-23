import PropTypes from 'prop-types';
import { format } from '../lib/number-utils';

const Popup = ({
  averagePrice,
  totalAmount,
  totalPrice,
  currency,
  convolutedCurrency,
}) => (
  <div className="popover" style={{ width: '250px' }}>
    <div>
      You may buy {format(totalAmount)} {currency} for {format(totalPrice)} {convolutedCurrency}
    </div>
    <div>Average price {format(averagePrice)} {convolutedCurrency} for 1 {currency}</div>
  </div>
);

Popup.propTypes = {
  averagePrice: PropTypes.number.isRequired,
  totalAmount: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  convolutedCurrency: PropTypes.string.isRequired,
};

export default Popup;
