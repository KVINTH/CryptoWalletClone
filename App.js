import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet, View, Image, Platform,
} from 'react-native';
import { useFonts, Shanti_400Regular } from '@expo-google-fonts/shanti';
import CurrentBalance from './components/CurrentBalance';
import Button from './components/Button';
import { Divider } from './components/Divider';
import CurrencyListItem from './components/CurrencyListItem';
import canadaLogo from './assets/canada_logo.png';
import bitcoinLogo from './assets/bitcoin_logo.png';
import ethereumLogo from './assets/ethereum_logo.png';
import { formatCurrency, calculateFiatBalance } from './shared/helpers/CurrencyHelper';
import { getCurrencyInfo } from './shared/apis/CryptocurrencyApi';

export default function App() {
  const [fontsLoaded] = useFonts({
    Shanti_400Regular,
  });
  const [isLoading, setLoading] = useState(true);
  const [currencyInfo, setCurrencyInfo] = useState({});

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

  useEffect(() => {
    getCurrencyInfoFromApi();
  }, []);

  if (!fontsLoaded || isLoading) {
    return <AppLoading />;
  }
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
        }}
        style={{ width: 50, height: 50 }}
      />
      <CurrentBalance
        style={styles.currentBalance}
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
        currencyName="Dollars"
        currencyBalance="5.00"
      />
      <CurrencyListItem
        imageSrc={bitcoinLogo}
        currencyName="Bitcoin"
        currencyPrice={currencyInfo.bitcoin.usd}
        currencyBalance="0.1002"
        fiatBalance={0.1002}
      />
      <CurrencyListItem
        imageSrc={ethereumLogo}
        currencyName="Ethereum"
        currencyPrice={currencyInfo.ethereum.usd}
        currencyBalance="1.00"
        fiatBalance={1.00}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  currentBalance: {
    paddingTop: 30,
    paddingBottom: 30,
  },
});
