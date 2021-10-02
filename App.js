import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
import React from 'react';
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

export default function App() {
  const [fontsLoaded] = useFonts({
    Shanti_400Regular,
  });

  if (!fontsLoaded) {
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
        currencyPrice="$60,458.66"
        currencyBalance="0.1002"
        fiatBalance="$6,059.85"
      />
      <CurrencyListItem
        imageSrc={ethereumLogo}
        currencyName="Ethereum"
        currencyPrice="$4,155.51"
        currencyBalance="1.00"
        fiatBalance="$4,155.60"
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
