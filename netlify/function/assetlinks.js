// netlify/functions/assetlinks.js

export async function handler (event, context) {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        {
          "relation": ["delegate_permission/common.handle_all_urls"],
          "target": {
            "namespace": "android_app",
            "package_name": "app.netlify.cd_monitoring_suhu.twa",
            "sha256_cert_fingerprints": ["03:87:DC:2F:1A:73:DE:C9:BB:AD:AA:AB:F5:0E:EE:9A:5A:AA:30:4D:12:6C:E5:02:8D:96:2D:6C:E0:AE:05:24"]
          }
        }
      ]),
    };
  }
  