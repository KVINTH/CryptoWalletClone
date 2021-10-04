import React from 'react';
import { View, StyleSheet } from 'react-native';

const Divider = () => (
  <View
    style={styles.divider}
  />
);

const styles = StyleSheet.create({
  divider: {
    borderBottomColor: '#f2f6f7',
    borderBottomWidth: 1,
    width: '100%',
    marginTop: 20,
  },
});

export default Divider;
