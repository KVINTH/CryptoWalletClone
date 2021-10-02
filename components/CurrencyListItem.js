import React from 'react';
import {
  View, Image, Text, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

const CurrencyListItem = ({
  imageSrc, currencyName, currencyPrice, currencyBalance, fiatBalance,
}) => (
  <View style={styles.container}>
    <Image
      source={imageSrc}
      style={styles.image}
    />
    <View
      style={styles.innerContainer}
    >
      <View>
        <Text
          style={styles.primaryText}
        >
          {currencyName}
        </Text>
        {currencyPrice
                && (
                <Text
                  style={styles.secondaryText}
                >
                  {currencyPrice}
                </Text>
                )}
      </View>

      <View
        style={styles.currentBalanceContainer}
      >
        <Text
          style={styles.primaryText}
        >
          {currencyBalance}
        </Text>
        {fiatBalance
                && (
                <Text
                  style={styles.secondaryText}
                >
                  {fiatBalance}
                </Text>
                )}
      </View>
    </View>
  </View>
);

CurrencyListItem.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  currencyName: PropTypes.string.isRequired,
  currencyPrice: PropTypes.string,
  currencyBalance: PropTypes.string.isRequired,
  fiatBalance: PropTypes.string,
};

CurrencyListItem.defaultProps = {
  currencyPrice: '',
  fiatBalance: '',
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    marginRight: 20,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  currentBalanceContainer: {
    alignItems: 'flex-end',
  },
  primaryText: {
    fontSize: 24,
  },
  secondaryText: {
    fontSize: 18,
    color: 'gray',
  },
});
export default CurrencyListItem;
