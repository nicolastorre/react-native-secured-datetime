#import "SecuredDatetime.h"
#import <time.h>

@implementation SecuredDatetime

RCT_EXPORT_MODULE()

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getElapsedRealtime)
{
  struct timespec time;
  if (clock_gettime(CLOCK_MONOTONIC_RAW, &time) == 0) {
    double elapsedSeconds = time.tv_sec + (time.tv_nsec / 1e9);
    return @(elapsedSeconds);
  } else {
    // Retourne 0 si erreur (ou autre valeur par défaut)
    return @(0);
  }
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
  return std::make_shared<facebook::react::NativeSecuredDatetimeSpecJSI>(params);
}

@end
