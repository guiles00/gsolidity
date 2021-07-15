import Header from "./Header";
import { Container  } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import Head from "next/head";

export default function Layout({ children }) {
  return (
    <Container>
      <Head />
      <Header />
      {children}
    </Container>  
  )
}