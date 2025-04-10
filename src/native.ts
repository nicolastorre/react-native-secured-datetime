import { NativeModules, Platform } from "react-native";

const Native = NativeModules.SecuredDatetime;

if (!Native) {
  throw new Error("Native module 'SecuredDatetime' is not linked properly.");
}

/**
 * Returns the number of seconds since device boot (float).
 */
export const getElapsedRealtime = async (): Promise<number> => {
  return await Native.getElapsedRealtime();
};
