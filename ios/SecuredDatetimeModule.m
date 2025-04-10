#import "SecuredDatetimeModule.h"
#import <React/RCTLog.h>

@implementation SecuredDatetimeModule

// Exported module name: accessible via NativeModules.SecuredDatetime in JS
RCT_EXPORT_MODULE(SecuredDatetime)

/**
 * Returns the time elapsed since the device boot (in seconds).
 * Uses clock_gettime with CLOCK_MONOTONIC_RAW to avoid manipulation from system time changes.
 */
RCT_EXPORT_METHOD(getElapsedRealtime:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  struct timespec time;
  if (clock_gettime(CLOCK_MONOTONIC_RAW, &time) == 0) {
    double elapsedSeconds = time.tv_sec + (time.tv_nsec / 1e9);
    resolve(@(elapsedSeconds));
  } else {
    NSError *error = [NSError errorWithDomain:@"SecuredDatetime" code:500 userInfo:nil];
    reject(@"clock_error", @"Failed to get elapsed realtime", error);
  }
}

@end
