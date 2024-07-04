import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import './globals.css'
import { ConfettiProvider } from '@/components/providers/confetti-provider'
import { ToastProvider } from '@/components/providers/toaster-provider'

const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"],
});


export const metadata: Metadata = {
  title: 'Education',
  description: 'An LMS Platform',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={poppins.className}>
          <ConfettiProvider />
          <ToastProvider />
          {children}
        </body>
      </html>
    </SessionProvider>
  )
}
