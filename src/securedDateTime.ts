import { getElapsedRealtime } from "./native";

/**
 * Computes a secure Date using a trusted server datetime and native uptime.
 *
 * @param serverDateTime - Date or ISO string received from server
 * @param oldElapsedRealtime - ElapsedRealtime value at fetch time (in seconds)
 * @returns Promise<Date>
 */
export const getSecuredDateTime = async (
  serverDateTime: string | Date,
  oldElapsedRealtime: number
): Promise<Date> => {
  const newElapsedRealtime = await getElapsedRealtime();
  const serverDate = new Date(serverDateTime);
  const deltaSeconds = newElapsedRealtime - oldElapsedRealtime;
  return new Date(serverDate.getTime() + deltaSeconds * 1000);
};
