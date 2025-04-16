package com.secureddatetime

import android.os.SystemClock
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = SecuredDatetimeModule.NAME)
class SecuredDatetimeModule(reactContext: ReactApplicationContext) :
  NativeSecuredDatetimeSpec(reactContext) {

  override fun getName(): String {
    return NAME
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  override fun getElapsedRealtime(): Double {
    val elapsedMillis = SystemClock.elapsedRealtime()
    return elapsedMillis / 1000.0
  }

  companion object {
    const val NAME = "SecuredDatetime"
  }
}
