# Facebook SSL Pinning Bypass

## NO ROOT: Patched-APK Method
Using install-multiple command:

```
adb -s <device_id> install-multiple base.apk split_config.xhdpi.apk
```
Download: [Facebook Patched APK Releases](https://github.com/zokieer/Facebook-SSL-Pinning-Bypass/releases)

## ROOT: Run using Frida

This method requires frida-tools and frida-server running in the device
```
frida -U -l bypass.js -p <PID>
```

## Capturing http traffic

I'm currently using [Requable](https://reqable.com/). Now you should be able to see the network traffic.

Inspired by Eltion!