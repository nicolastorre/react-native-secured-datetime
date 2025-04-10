package com.secureddatetime;

import android.os.SystemClock;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class SecuredDatetimeModule extends ReactContextBaseJavaModule {

    public SecuredDatetimeModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "SecuredDatetime";
    }

    /**
     * Returns the time elapsed since the device boot (in seconds).
     * This is not affected by changes in the system clock.
     */
    @ReactMethod
    public void getElapsedRealtime(Promise promise) {
        long elapsedMillis = SystemClock.elapsedRealtime();
        double elapsedSeconds = elapsedMillis / 1000.0;
        promise.resolve(elapsedSeconds);
    }
}
