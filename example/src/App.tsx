import { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {
  getElapsedRealtime,
  getSecuredDateTime,
} from 'react-native-secured-datetime';

export default function App() {
  const [securedDateTime, setSecuredDateTime] = useState<Date | null>(null);

  const elapsedRealTime = getElapsedRealtime();

  useEffect(() => {
    const init = async () => {
      try {
        const res = await fetch(
          'https://timeapi.io/api/Time/current/zone?timeZone=Europe/Paris'
        );
        const data = await res.json();

        const serverTime = data.dateTime;
        const elapsed = getElapsedRealtime();
        const newSecuredDateTime = getSecuredDateTime(serverTime, elapsed);
        setSecuredDateTime(newSecuredDateTime);
      } catch (err) {
        console.error(err);
      }
    };
    init();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Elapsed real time: {elapsedRealTime}</Text>
      <Text>Secured date time: {securedDateTime?.toISOString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
