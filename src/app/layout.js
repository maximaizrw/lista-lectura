import './globals.css'
import { Inter } from 'next/font/google'
import Header from './components/header'

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({ children }) {
  return (
    <html lang="es">

      <body className={inter.className}  >

        <Header />
        {children}</body>
    </html>
  )
}
