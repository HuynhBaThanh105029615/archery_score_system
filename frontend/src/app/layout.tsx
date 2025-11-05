import { Header } from "../component/header";
import "../app/global.css";
import { Footer } from "../component/footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <Header />


        {children}

        <Footer />

        </body>
    </html>
  )
}