import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Interactive Estate Agent AI Chatbot',
  description: 'The Interactive Estate Agent AI Chatbot is a cutting-edge virtual assistant designed to engage visitors on a property listing website. It utilizes natural language processing and machine learning algorithms to understand user queries, answer questions, and guide them through the property selection process',
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
