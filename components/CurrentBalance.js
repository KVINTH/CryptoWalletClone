import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropType from 'prop-types';

const CurrentBalance = ({ balance }) => (
  <View style={styles.currentBalanceContainer}>
    <Text style={styles.currencySymbol}>$</Text>
    <Text style={styles.currentBalance}>
      {balance.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}
    </Text>
  </View>
);

CurrentBalance.propTypes = {
  balance: PropType.number,
};

CurrentBalance.defaultProps = {
  balance: 0,
};

const styles = StyleSheet.create({
  currentBalanceContainer: {
    flexDirection: 'row',
    paddingTop: 30,
    paddingBottom: 30,
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
