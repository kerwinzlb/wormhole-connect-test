'use client'; // This is a client component 👈🏽

/* eslint-disable react/display-name */
import React from 'react';

import Page from '../components/Page';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'aos/dist/aos.css';

/* eslint-disable react/prop-types */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>GEOD BURN</title>
        <link rel="shortcut icon" href="/images/favicon.png" />
        <meta name="theme-color" content="#ffffff" />
        <meta
          property="og:site_name"
          content="BURN system of the GEODNET"
        />
        <meta
          property="og:title"
          content="BURN system of the GEODNET"
        />
        <meta property="og:url" content="http://110.41.165.230:3002/" />
        <meta property="og:type" content="website" />
        <link
          rel="image_src"
          href="http://110.41.165.230:3002/images/meta.jpg"
        />
      </head>
      <body>
        <Page>{children}</Page>
      </body>
    </html>
  );
}
