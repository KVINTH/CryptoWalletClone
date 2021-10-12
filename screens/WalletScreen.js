import React, { useEffect, useState } from 'react';
import {
  FlatList, Image, StyleSheet, View,
} from 'react-native';
import AppLoading from 'expo-app-loading';
import PropTypes from 'prop-types';
import CurrentBalance from '../components/CurrentBalance';
import Button from '../components/Button';
import CurrencyListItem from '../components/CurrencyListItem';
import Divider from '../components/Divider';
import Images from '../assets/index';
import { getCurrencyInfo } from '../shared/apis/CryptocurrencyApi';
import { calculateFiatBalance } from '../shared/helpers/CurrencyHelper';

const WalletScreen = ({ user }) => {
  const [isLoading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currencyInfo, setCurrencyInfo] = useState({});
  const [totalBalance, setTotalBalance] = useState(0);
  const [walletData, setWalletData] = useState([]);

  async function getCurrencyInfoFromApi() {
    try {
      const data = await getCurrencyInfo();
      setCurrencyInfo(data);
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

  async function onRefresh() {
    setIsRefreshing(true);
    await getCurrencyInfoFromApi();
    setIsRefreshing(false);
  }
  useEffect(() => {
    getCurrencyInfoFromApi();
  }, []);

  useEffect(() => {
    const balance = calculateTotalBalance();
    setTotalBalance(balance);
  }, [currencyInfo]);

  useEffect(() => {
    const data = [];
    for (let i = 0; i < user.wallets.length; i += 1) {
      const currencyName = user.wallets[i].currency.toLowerCase();
      const currentCurrencyInfo = currencyInfo[currencyName];
      data.push(
        {
          imageSrc: Images.currencies[currencyName],
          currencyName: user.wallets[i].currency,
          currencyPrice: currentCurrencyInfo !== undefined ? currentCurrencyInfo.usd : undefined,
          currencyBalance: user.wallets[i].balance,
          fiatBalance: '',
        },
      );
    }
    setWalletData(data);
  }, [currencyInfo]);
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
      <FlatList
        keyExtractor={(item) => item.currencyName}
        data={walletData}
        onRefresh={() => onRefresh()}
        refreshing={isRefreshing}
        renderItem={({ item }) => (
          <CurrencyListItem
            imageSrc={item.imageSrc}
            currencyName={item.currencyName}
            currencyPrice={item.currencyPrice}
            currencyBalance={item.currencyBalance}
          />
        )}
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
