import SecuredDatetime from './NativeSecuredDatetime';

export function getElapsedRealtime(): number {
  return SecuredDatetime.getElapsedRealtime();
}

/**
 * Computes a secure Date using a trusted server datetime and native uptime.
 *
 * @param serverDateTime - Date or ISO string received from server
 * @param oldElapsedRealtime - ElapsedRealtime value at fetch time (in seconds)
 * @returns Promise<Date>
 */
export const getSecuredDateTime = (
  serverDateTime: string | Date,
  oldElapsedRealtime: number
): Date => {
  const newElapsedRealtime = getElapsedRealtime();
  const serverDate = new Date(serverDateTime);
  if (isNaN(serverDate.getTime())) {
    throw new Error('server date error');
  }
  const deltaSeconds = newElapsedRealtime - oldElapsedRealtime;
  return new Date(serverDate.getTime() + deltaSeconds * 1000);
};
