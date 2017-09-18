import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { format } from '../lib/number-utils';

class ExchangeForm extends PureComponent {
  static propTypes = {
    form: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    totalPrice: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    convolutedCurrency: PropTypes.string.isRequired,
    error: PropTypes.string,
  };

  static defaultProps = {
    totalPrice: 0,
    error: '',
  };

  static ERROR_TEXT = {
    not_number: 'Enter a number',
    lessZero: 'Enter a number more than 0',
    moreTotal: 'Limit is exceeded',
  };

  onCountChange = ({ target: { value } }) =>
    this.props.onChange('count', value);

  onTypeChange = ({ target: { value } }) =>
    this.props.onChange('type', value);

  render() {
    const { form, totalPrice, currency, convolutedCurrency, error } = this.props;
    const { count, type } = form;
    const isTotalShown = !error && !!count.trim();

    return (
      <div className="col-lg-12">
        <h3 className="h3 font-weight-normal">Buy/Sell</h3>
        <form>
          <div className="form-inline">
            <select className="form-control mb-2 mr-sm-2 mb-sm-0" value={type} onChange={this.onTypeChange}>
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </select>
            <div className="input-group mb-2 mr-sm-2 mb-sm-0">
              <input type="number" className="form-control" value={count} onChange={this.onCountChange} />
              <div className="input-group-addon text-uppercase">{currency}</div>
            </div>
            {isTotalShown && <div>
              <strong>Total: </strong>
              {format(totalPrice)}
              <span className="text-uppercase"> {convolutedCurrency}</span>
            </div>}
          </div>
          <div>
            {error && <span className="text-danger">{ExchangeForm.ERROR_TEXT[error] || 'Invalid'}</span>}
          </div>
        </form>
      </div>
    );
  }
}

export default ExchangeForm;
