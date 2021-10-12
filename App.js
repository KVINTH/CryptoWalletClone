import AppLoading from 'expo-app-loading';
import React, { useEffect, useState } from 'react';
import {
  StatusBar, StyleSheet, View,
} from 'react-native';
import { useFonts, Shanti_400Regular } from '@expo-google-fonts/shanti';
import WalletScreen from './screens/WalletScreen';
import { getUserInfo } from './shared/apis/UserApi';

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const [fontsLoaded] = useFonts({
    Shanti_400Regular,
  });

  async function getUserInfoFromApi() {
    try {
      const data = await getUserInfo(1);
      setUserInfo(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUserInfoFromApi();
  }, []);

  if (!fontsLoaded || isLoading) {
    return <AppLoading />;
  }
  return (
    <View style={styles.container}>
      <WalletScreen
        user={userInfo}
      />
      <StatusBar />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginTop: StatusBar.currentHeight || 0,
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
