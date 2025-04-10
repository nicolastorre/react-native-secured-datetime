import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  getElapsedRealtime,
  getSecuredDateTime,
} from 'react-native-secured-datetime';

export default function App() {
  const [secureTime, setSecureTime] = useState<Date | null>(null);

  useEffect(() => {
    const init = async () => {
      const response = await fetch(
        'https://worldtimeapi.org/api/timezone/Europe/Paris',
      );
      const data = await response.json();
      const serverTime = data.datetime;
      const elapsed = await getElapsedRealtime();
      const result = await getSecuredDateTime(serverTime, elapsed);
      setSecureTime(result);
    };
    init();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Secure time: {secureTime?.toISOString() ?? 'Loading...'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  text: {fontSize: 16},
});
