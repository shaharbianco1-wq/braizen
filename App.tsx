import { Asset } from 'expo-asset';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';

export default function App() {
  const [uri, setUri] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const [asset] = await Asset.loadAsync(require('./assets/brizen.html'));
      setUri(asset.localUri!);
    })();
  }, []);

  return (
    <View style={s.root}>
      <StatusBar style="light" />
      {uri ? (
        <WebView
          source={{ uri }}
          style={s.web}
          javaScriptEnabled
          domStorageEnabled
          allowFileAccess
          allowFileAccessFromFileURLs
          allowUniversalAccessFromFileURLs
          originWhitelist={['*']}
          mixedContentMode="always"
        />
      ) : (
        <View style={s.loading}>
          <ActivityIndicator size="large" color="#2563EB" />
        </View>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  root:    { flex: 1, backgroundColor: '#0C0C1A' },
  web:     { flex: 1 },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
