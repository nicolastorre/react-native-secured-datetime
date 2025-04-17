import { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {
  getElapsedRealtime,
  getSecuredDateTime,
} from 'react-native-secured-datetime';

export default function App() {
  const [securedDateTime, setSecuredDateTime] = useState<Date | null>(null);

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
      <View style={styles.header}>
        <Text style={styles.headerText}>react-native-secured-datetime</Text>
      </View>
      <View style={styles.body}>
        <View style={[styles.item, styles.wrongItem]}>
          <Text style={styles.text}>Local datetime:</Text>
          <Text style={styles.text}>{new Date().toISOString()}</Text>
        </View>
        <View style={[styles.item, styles.rightItem]}>
          <Text style={styles.text}>Secured datetime:</Text>
          <Text style={styles.text}>{securedDateTime?.toISOString()}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  body: {
    marginBottom: 20,
  },
  item: {
    padding: 5,
    marginBottom: 10,
    borderWidth: 5,
    borderColor: 'gray',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrongItem: {
    borderColor: 'red',
  },
  rightItem: {
    borderColor: 'green',
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
