import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import { Container, Message } from './styles';

export default function EmptyBox({ children, icon }) {
  return (
    <Container>
      {icon && <Icon name={icon} size={50} color="#7159c1" />}
      <Message>{children}</Message>
    </Container>
  );
}

EmptyBox.propTypes = {
  icon: PropTypes.string,
};

EmptyBox.defaultProps = {
  icon: null,
};
