import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { format } from '../lib/number-utils';

class OrderTable extends PureComponent {
  static propTypes = {
    data: PropTypes.array,
    columns: PropTypes.array,
    title: PropTypes.string,
    className: PropTypes.string,
    titleClassName: PropTypes.string,
  };

  static defaultProps = {
    data: [],
    columns: [{
      id: 'id',
    }, {
      id: 'volume',
      text: 'amount',
      prepareData({ volume }) {
        return format(volume);
      },
    }, {
      id: 'price',
      text: 'price',
      prepareData({ price }) {
        return format(price);
      },
    }],
    title: '',
    className: '',
    titleClassName: '',
  };

  render() {
    const { data, columns, title, className, titleClassName } = this.props;

    return (
      <div className={className}>
        {!!title && <strong className={classNames('mb-2 d-block text-uppercase', titleClassName)}>
          <span>{title}</span>
        </strong>}
        <table className="table table-condensed table-hover">
          <thead className="text-uppercase">
            {columns.map(({ id, text }) => (
              <th key={id}>
                <span>{text}</span>
              </th>
            ))}
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                {columns.map(({ id, prepareData }) => (
                  <td key={id}>
                    <span>{prepareData ? prepareData(item) : item[id]}</span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default OrderTable;
