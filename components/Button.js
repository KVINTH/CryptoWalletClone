import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

const Button = ({ iconName, text }) => (
  <TouchableOpacity style={styles.button}>
    <Ionicons name={iconName} size={18} color="#1493e7" />
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

Button.propTypes = {
  iconName: PropTypes.string,
  text: PropTypes.string,
};

Button.defaultProps = {
  iconName: '',
  text: '',
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#f0f7fe',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    minWidth: 170,
  },
  buttonText: {
    fontSize: 16,
    color: '#1493e7',
    paddingLeft: 5,
  },
});
export default Button;
