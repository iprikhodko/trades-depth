import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Popover from 'react-popover';
import { format } from '../lib/number-utils';
import { noop } from '../lib/common';
import Popup from '../containers/Popup';
import Row from './TableRow';

class OrderTable extends PureComponent {
  static propTypes = {
    data: PropTypes.array,
    slicedData: PropTypes.array,
    currency: PropTypes.string,
    convolutedCurrency: PropTypes.string,
    preferPlacePopup: PropTypes.string,
    columns: PropTypes.array,
    title: PropTypes.string,
    className: PropTypes.string,
    titleClassName: PropTypes.string,
    selectedRowIndex: PropTypes.number,
    onRowSelect: PropTypes.func,
    onRowUnselect: PropTypes.func,
  };

  static defaultProps = {
    data: [],
    slicedData: [],
    currency: '',
    convolutedCurrency: '',
    preferPlacePopup: 'above',
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
    selectedRowIndex: null,
    onRowSelect: noop,
    onRowUnselect: noop,
  };

  render() {
    const {
      data,
      slicedData,
      currency,
      convolutedCurrency,
      preferPlacePopup,
      columns,
      title,
      className,
      titleClassName,
      selectedRowIndex,
      onRowSelect,
      onRowUnselect,
    } = this.props;

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
            {data.map((item, index) => {
              const isSelected = index === selectedRowIndex;
              let row = (
                <Row
                  key={index}
                  index={index}
                  selected={index === selectedRowIndex}
                  hovered={index < selectedRowIndex}
                  onMouseEnter={onRowSelect}
                  onMouseLeave={onRowUnselect}
                >
                  {columns.map(({ id, prepareData }) => (
                    <td key={id}>
                      <span>{prepareData ? prepareData(item) : item[id]}</span>
                    </td>
                  ))}
                </Row>
              );

              if (isSelected) {
                row = (
                  <Popover
                    key={index}
                    body={<Popup
                      orders={slicedData}
                      currency={currency}
                      convolutedCurrency={convolutedCurrency}
                    />}
                    isOpen
                    preferPlace={preferPlacePopup}
                    onOuterAction={onRowUnselect}
                  >
                    {row}
                  </Popover>
                );
              }

              return row;
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default OrderTable;
