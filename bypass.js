//https://github.com/zokieer/Facebook-SSL-Pinning-Bypass
'use strict';

const SYMBOL = "_ZN8proxygen15SSLVerification17verifyWithMetricsEbP17x509_store_ctx_stRKNSt6__ndk212basic_stringIcNS3_11char_traitsIcEENS3_9allocatorIcEEEEPNS0_31SSLFailureVerificationCallbacksEPNS0_31SSLSuccessVerificationCallbacksERKNS_15TimeUtilGenericINS3_6chrono12steady_clockEEERNS_10TraceEvent";

function log(msg) {
    console.log(msg);
    try {
        Java.perform(function () {
            Java.use("android.util.Log").v("FBSSL", msg);
        });
    } catch (e) {}
}

function tryHook() {
    const mod = Process.findModuleByName("libcoldstart.so");
    if (!mod) {
        return false;
    }

    const exports = mod.enumerateExports();
    let target = null;
    for (let i = 0; i < exports.length; i++) {
        if (exports[i].name.includes(SYMBOL)) {
            target = exports[i].address;
            break;
        }
    }

    if (target) {
        log("Founded: " + target);
        Interceptor.attach(target, {
            onLeave: function (retval) {
                retval.replace(ptr(1));
                log("Replace return value to 1 success");
            }
        });
    } else {
        log("Cannot find SSL Verification funtion");
    }
    return true;
}

log("[*] Script started, waiting for libcoldstart.so ...");
if (!tryHook()) {
    const timer = setInterval(function () {
        if (tryHook()) clearInterval(timer);
    }, 200);
}