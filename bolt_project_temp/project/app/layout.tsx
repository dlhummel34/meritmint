import './globals.css';
import type { Metadata } from 'next';
import { Inter, Cormorant } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const cormorant = Cormorant({ 
  subsets: ['latin'],
  variable: '--font-cormorant',
});

export const metadata: Metadata = {
  title: '4Horsemen Global Holdings | Elite Global Trade & Infrastructure Solutions',
  description: 'Distinguished family office specializing in premium commodities trading, international banking, digital assets, and infrastructure development.',
  keywords: 'commodities trading, infrastructure development, trade finance, digital assets, family office, SBLC, MTN, cryptocurrency',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${cormorant.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}