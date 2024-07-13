// import '../../public/global.css';

// export default function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }

import type { AppProps } from 'next/app'
import '../../public/global.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}