package com.example.sharemeal

import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugin.common.MethodChannel
import android.content.pm.PackageManager
import android.location.Geocoder
import java.util.Locale

class MainActivity : FlutterActivity() {
    override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)
        MethodChannel(flutterEngine.dartExecutor.binaryMessenger, "sharemeal/maps_config")
            .setMethodCallHandler { call, result ->
                if (call.method == "isConfigured") {
                    val info = packageManager.getApplicationInfo(packageName, PackageManager.GET_META_DATA)
                    val key = info.metaData?.getString("com.google.android.geo.API_KEY") ?: ""
                    result.success(key.isNotBlank() && !key.startsWith("YOUR_"))
                } else if (call.method == "geocode") {
                    val address = call.argument<String>("address") ?: ""
                    if (address.isBlank() || !Geocoder.isPresent()) {
                        result.success(null)
                    } else {
                        Thread {
                            try {
                                @Suppress("DEPRECATION")
                                val point = Geocoder(this, Locale.getDefault()).getFromLocationName(address, 1)?.firstOrNull()
                                runOnUiThread { result.success(point?.let {
                                    mapOf("latitude" to it.latitude, "longitude" to it.longitude)
                                }) }
                            } catch (error: Exception) {
                                runOnUiThread { result.error("GEOCODE", "Cannot locate this address", null) }
                            }
                        }.start()
                    }
                } else result.notImplemented()
            }
    }
}
