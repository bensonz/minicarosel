import "@/styles/globals.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { muiTheme } from "../styles/muiTheme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <ToastContainer autoClose={2000} />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
