"use client";

import Script from "next/script";

export function WeglotProvider() {
  return (
    <Script
      id="weglot-script"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          window.weglotInit({
            api_key: 'wg_c8379e79a7ec7bf9abcf81af1ede43c39',
            hide_switcher: false,
            switchers: [
              {
                button_style: {
                  full_name: true,
                  with_name: true,
                  is_dropdown: true,
                  with_flags: true
                }
              }
            ]
          });
        `,
      }}
    />
  );
}
