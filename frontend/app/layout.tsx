import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Interactive Estate Agents | Your Journey to the Perfect Home Starts Here',
  description: "Interactive Estate Agents is a modern and technology-driven estate agency that redefines the real estate experience. With an AI-powered Smart Advisor, users can engage in dynamic conversations to explore property details effortlessly. The platform integrates innovative features like audio recording, fostering real-time communication and creating an immersive environment. The website's sleek design, high-quality images, and intuitive layout enhance user experience. While embracing cutting-edge technology, Interactive Estate Agents maintains essential features of traditional agencies, providing a comprehensive and engaging platform for navigating the property market",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
