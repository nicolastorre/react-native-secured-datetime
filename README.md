# react-native-secured-datetime

Securely compute the current date and time using a trusted server datetime and the device's native monotonic clock (`elapsedRealtime`).

This prevents cheating or manipulation of time by tampering with the system clock.

---

## 🚀 Features

- ✅ Returns a secure `Date` object based on a known server datetime and native uptime
- ✅ Cross-platform: Android & iOS native support
- ✅ Lightweight: No external dependencies
- ✅ Ideal for validating timestamps in sensitive apps (games, attendance, finance...)

---

## 📦 Installation

```bash
npm install react-native-secured-datetime
# or
yarn add react-native-secured-datetime
```

### iOS only

```bash
cd ios && pod install
```

## 🛠 Usage

```js
import {
  getSecuredDateTime,
  getElapsedRealtime,
} from "react-native-secured-datetime";

const example = async () => {
  // 1. Fetch server time from a trusted source
  const res = await fetch("https://worldtimeapi.org/api/timezone/Europe/Paris");
  const data = await res.json();
  const serverDateTime = data.datetime;

  // 2. Capture current uptime when server time is received
  const elapsedAtFetch = await getElapsedRealtime();

  // 3. Later on, reconstruct the current secure datetime
  const secureNow = await getSecuredDateTime(serverDateTime, elapsedAtFetch);

  console.log("Secure datetime:", secureNow.toISOString());
};
```

## 🧩 API

getElapsedRealtime(): Promise<number>
Returns the number of seconds (as a float) since the device booted — not affected by system clock changes.

getSecuredDateTime(serverDateTime: string | Date, oldElapsedRealtime: number): Promise<Date>
Computes the current secure Date by applying the time difference to the original trusted server time.

## 🧱 How it works

This module:

Takes a server datetime T₀ and the uptime at that moment U₀

Later, measures the new uptime U₁

Computes:

```
T₁ = T₀ + (U₁ - U₀)
```

This ensures accurate and manipulation-proof time calculation, based on monotonic system clocks.

## 🛡 Use Cases

- Games & anti-cheat systems

- Attendance & check-in validation

- Offline secure time tracking

- Finance or digital contract timestamping

## 🧪 Example with WorldTimeAPI

```js
const loadSecureTime = async () => {
  const timezone = "Europe/Paris";
  const response = await fetch(
    `https://worldtimeapi.org/api/timezone/${timezone}`
  );
  const data = await response.json();
  const serverDateTime = data.datetime;
  const oldElapsed = await getElapsedRealtime();

  // Store both locally if needed (e.g., AsyncStorage)

  const securedNow = await getSecuredDateTime(serverDateTime, oldElapsed);
  console.log("Secure time:", securedNow);
};
```

## 📜 License

MIT © 2025 – nicolastorre
