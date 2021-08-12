import Document, { Html, Head, Main, NextScript } from "next/document";
import "tailwindcss/tailwind.css";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body className="min-h-screen overflow-y-scroll">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
