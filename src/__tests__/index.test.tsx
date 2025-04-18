import { getSecuredDateTime, getElapsedRealtime } from '../index';
import SecuredDatetime from '../NativeSecuredDatetime';

jest.mock('../NativeSecuredDatetime', () => ({
  getElapsedRealtime: jest.fn(),
}));

describe('getElapsedRealtime', () => {
  it('should call native module', () => {
    (SecuredDatetime.getElapsedRealtime as jest.Mock).mockReturnValue(123);
    const result = getElapsedRealtime();
    expect(result).toBe(123);
    expect(SecuredDatetime.getElapsedRealtime).toHaveBeenCalled();
  });
});

describe('getSecuredDateTime', () => {
  it('should compute correct secured datetime', () => {
    const serverTime = new Date('2025-04-18T10:00:00Z');
    const oldElapsed = 1000;
    const newElapsed = 1010;

    (SecuredDatetime.getElapsedRealtime as jest.Mock).mockReturnValue(
      newElapsed
    );

    const result = getSecuredDateTime(serverTime, oldElapsed);

    expect(result.getTime()).toBe(
      serverTime.getTime() + (newElapsed - oldElapsed) * 1000
    );
  });

  it('should throw error on invalid server date', () => {
    (SecuredDatetime.getElapsedRealtime as jest.Mock).mockReturnValue(1010);

    expect(() => getSecuredDateTime('invalid-date', 1000)).toThrow(
      'server date error'
    );
  });
});
