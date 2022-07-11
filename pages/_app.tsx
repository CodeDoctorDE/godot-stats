import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <meta name='application-name' content='Godot statistics' />
      <meta name='apple-mobile-web-app-capable' content='yes' />
      <meta name='apple-mobile-web-app-status-bar-style' content='default' />
      <meta name='apple-mobile-web-app-title' content='Godot statistics' />
      <meta name='description' content='Track the progress of the development of the Godot engine.' />
      <meta name='format-detection' content='telephone=no' />
      <meta name='mobile-web-app-capable' content='yes' />
      <meta name='msapplication-config' content='/icons/browserconfig.xml' />
      <meta name='msapplication-TileColor' content='#121d40' />
      <meta name='msapplication-tap-highlight' content='no' />
      <meta name='theme-color' content='#4d9fdc' />

      <link rel='icon' type='image/png' sizes='32x32' href='/icons/favicon-32x32.png' />
      <link rel='icon' type='image/png' sizes='16x16' href='/icons/favicon-16x16.png' />
      <link rel='manifest' href='/manifest.json' />
      <link rel='mask-icon' href='/icons/safari-pinned-tab.svg' color='#5bbad5' />
      <link rel='shortcut icon' href='/favicon.ico' />
      
      <meta name='twitter:card' content='summary' />
      <meta name='twitter:url' content='https://yourdomain.com' />
      <meta name='twitter:title' content='Godot statistics' />
      <meta name='twitter:description' content='Track the progress of the development of the Godot engine.' />
      <meta name='twitter:image' content='https://godot-stats.linwood.dev/android/android-launchericon-192-192.png' />
      <meta name='twitter:creator' content='@LinwoodCloud' />
      <meta property='og:type' content='website' />
      <meta property='og:title' content='PWA App' />
      <meta property='og:description' content='Track the progress of the development of the Godot engine.' />
      <meta property='og:site_name' content='Godot statistics' />
      <meta property='og:url' content='https://godot-stats.linwood.dev' />
      <meta property='og:image' content='https://godot-stats.linwood.dev/android/android-launchericon-512-512.png' />
      <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover' />
    </Head>
    <Component {...pageProps} />
  </>
}

export default MyApp
