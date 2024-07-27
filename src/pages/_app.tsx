
import React from 'react';
import '../app/globals.scss';
type MyAppProps = {
  Component: React.ComponentType<any> | React.ComponentType<{}>
  pageProps: any
}
function MyApp({ Component, pageProps }: MyAppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
