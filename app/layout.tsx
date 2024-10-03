import "@/styles/global.css";
import Navigation from "@/components/Navigation";
import Provider from "@/components/Provider";

export const metadata = {
  title: "Promptmania",
  description: "Discover and share prompts",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        {/* @ts-ignore */}
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Navigation />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default Layout;
