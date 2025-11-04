import { Header } from "../component/header";
import "../app/global.css";

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

        <footer
            style={{
                backgroundColor: "ghostwhite",
                padding: "1rem"
            }}
        >
            <p>Footer</p>
        </footer>

        </body>
    </html>
  )
}