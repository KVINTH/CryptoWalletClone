import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

const CurrentBalance = ({ style }) => (
  <View style={[style, styles.currentBalanceContainer]}>
    <Text style={styles.currencySymbol}>$</Text>
    <Text style={styles.currentBalance}>10,220.45</Text>
  </View>
);

CurrentBalance.propTypes = {
  style: PropTypes.object,
};

CurrentBalance.defaultProps = {
  style: '',
};

const styles = StyleSheet.create({
  currentBalanceContainer: {
    flexDirection: 'row',
  },
  currencySymbol: {
    fontSize: 24,
    paddingTop: 7,
    paddingRight: 5,
    fontFamily: 'Shanti_400Regular',
  },
  currentBalance: {
    fontSize: 40,
    fontFamily: 'Shanti_400Regular',
  },
});

export default CurrentBalance;
