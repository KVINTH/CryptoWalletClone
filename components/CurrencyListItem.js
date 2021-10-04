import React from 'react';
import {
  View, Image, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { formatCurrency, calculateFiatBalance } from '../shared/helpers/CurrencyHelper';
import CurrencyListItemPrimaryText from './CurrencyList/CurrencyListItemPrimaryText';
import CurrencyListItemSecondaryText from './CurrencyList/CurrencyListItemSecondaryText';

const CurrencyListItem = ({
  imageSrc, currencyName, currencyPrice, currencyBalance,
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
        <CurrencyListItemPrimaryText>
          {currencyName}
        </CurrencyListItemPrimaryText>
        { currencyPrice !== undefined
            && (
              <CurrencyListItemSecondaryText>
                {`${formatCurrency(currencyPrice)}`}
              </CurrencyListItemSecondaryText>
            )}
      </View>
      <View
        style={styles.currentBalanceContainer}
      >
        <CurrencyListItemPrimaryText>
          {currencyBalance.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 4,
          })}
        </CurrencyListItemPrimaryText>
        { currencyPrice !== undefined && currencyBalance !== undefined
            && (
            <CurrencyListItemSecondaryText>
              {`${formatCurrency(calculateFiatBalance(currencyPrice, currencyBalance))}`}
            </CurrencyListItemSecondaryText>
            )}
      </View>
    </View>
  </View>
);

CurrencyListItem.propTypes = {
  imageSrc: PropTypes.number.isRequired,
  currencyName: PropTypes.string.isRequired,
  currencyPrice: PropTypes.number,
  currencyBalance: PropTypes.number.isRequired,
};

CurrencyListItem.defaultProps = {
  currencyPrice: undefined,
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
});
export default CurrencyListItem;
