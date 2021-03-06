import type { AppProps } from 'next/app';
import React from 'react';
import 'tailwindcss/tailwind.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
