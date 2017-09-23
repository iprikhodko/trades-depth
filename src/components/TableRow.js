import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { noop } from '../lib/common';

const events = ['onMouseEnter', 'onMouseLeave'];
const propTypes = {
  index: PropTypes.number.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  selected: PropTypes.bool,
  hovered: PropTypes.bool,
};
const defaultProps = {
  selected: false,
  hovered: false,
};

events.forEach((eventName) => {
  propTypes[eventName] = PropTypes.func;
  defaultProps[eventName] = noop;
});

class Row extends PureComponent {
  static propTypes = propTypes;
  static defaultProps = defaultProps;
  static events = events;

  constructor(props) {
    super(props);
    events.forEach((eventName) => {
      this[eventName] = (...args) =>
        this.props[eventName](this.props.index, ...args);
    });
  }

  render() {
    const { children, selected, hovered } = this.props;
    const trProps = Row.events.reduce((props, eventName) => ({
      ...props,
      [eventName]: this[eventName],
    }), {});

    return (
      <tr
        className={classNames({
          'table-active': selected,
          'table-hovered': hovered,
        })}
        {...trProps}
      >{children}</tr>
    );
  }
}

export default Row;
