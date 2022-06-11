import * as React from "react";
import {
  Link,
  // useStaticQuery,
  // graphql
} from "gatsby";
import {
  heading,
  navLinks,
  navLinkItem,
  navLinkText,
} from "./Layout.module.css";
import { Container } from "@mui/material";
import HideAppBar from "../common/HideAppBar";
// tsconfig에 global.d.ts 내용을 include해야 ts, tsx외의 파일을 TypeScript에서 인식할 수 있게 된다.
// ref : https://stackoverflow.com/questions/40382842/cant-import-css-scss-modules-typescript-says-cannot-find-module

const Layout = ({ pageTitle, children }) => {
  // const data = useStaticQuery(graphql`
  //   query {
  //     site {
  //       siteMetadata {
  //         title
  //       }
  //     }
  //   }
  // `);
  return (
    <Container maxWidth='desktop'>
      <HideAppBar />
      <nav>
        <ul className={navLinks}>
          <li className={navLinkItem}>
            <Link to='/' className={navLinkText}>
              Home
            </Link>
          </li>
          <li className={navLinkItem}>
            <Link to='/blog' className={navLinkText}>
              Blog
            </Link>
          </li>
          <li className={navLinkItem}>
            <Link to='/about' className={navLinkText}>
              About
            </Link>
          </li>
        </ul>
      </nav>
      <main>
        <h1 className={heading}>{pageTitle}</h1>
        {children}
      </main>
    </Container>
  );
};

export default Layout;
