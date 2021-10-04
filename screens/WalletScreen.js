import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import PropTypes from 'prop-types';
import CurrentBalance from '../components/CurrentBalance';
import Button from '../components/Button';
import CurrencyListItem from '../components/CurrencyListItem';
import Divider from '../components/Divider';
import canadaLogo from '../assets/canada_logo.png';
import bitcoinLogo from '../assets/bitcoin_logo.png';
import ethereumLogo from '../assets/ethereum_logo.png';
import { getCurrencyInfo } from '../shared/apis/CryptocurrencyApi';
import { calculateFiatBalance } from '../shared/helpers/CurrencyHelper';

const WalletScreen = ({ user }) => {
  const [isLoading, setLoading] = useState(true);
  const [currencyInfo, setCurrencyInfo] = useState({});
  const [totalBalance, setTotalBalance] = useState(0);

  async function getCurrencyInfoFromApi() {
    try {
      const data = await getCurrencyInfo();
      setCurrencyInfo(data);
      const bal = calculateTotalBalance();
      setTotalBalance(bal);
      console.log(bal);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  function calculateTotalBalance() {
    let totalFiatBalance = 0;
    for (let i = 0; i < user.wallets.length; i += 1) {
      const wallet = user.wallets[i];
      const { currency, balance } = wallet;
      const currentCurrencyInfo = currencyInfo[currency.toLowerCase()];

      if (currentCurrencyInfo !== undefined) {
        const fiatBalance = calculateFiatBalance(currentCurrencyInfo.usd, balance);
        totalFiatBalance += fiatBalance;
      }
    }
    return totalFiatBalance;
  }
  useEffect(() => {
    getCurrencyInfoFromApi();
  }, []);

  if (isLoading) {
    return <AppLoading />;
  }
  return (
    <View
      style={styles.container}
    >
      <Image
        source={{
          uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
        }}
        style={{ width: 50, height: 50 }}
      />
      <CurrentBalance
        balance={totalBalance}
      />
      <View
        style={styles.buttonContainer}
      >
        <Button
          iconName="md-arrow-down"
          text="Add Funds"
        />
        <Button
          iconName="md-arrow-up"
          text="Send"
        />
      </View>
      <Divider />
      <CurrencyListItem
        imageSrc={canadaLogo}
        currencyName={user.wallets[0].currency}
        currencyBalance={user.wallets[0].balance}
      />
      <CurrencyListItem
        imageSrc={bitcoinLogo}
        currencyName={user.wallets[1].currency}
        currencyPrice={currencyInfo.bitcoin.usd}
        currencyBalance={user.wallets[1].balance}
        fiatBalance={0.1002}
      />
      <CurrencyListItem
        imageSrc={ethereumLogo}
        currencyName={user.wallets[2].currency}
        currencyPrice={currencyInfo.ethereum.usd}
        currencyBalance={user.wallets[2].balance}
        fiatBalance={1.00}
      />
    </View>
  );
};

WalletScreen.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    wallets: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      currency: PropTypes.string,
      currencyCode: PropTypes.string,
      balance: PropTypes.number,
    })).isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
});

export default WalletScreen;
