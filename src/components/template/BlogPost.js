import React, { useEffect } from "react";
import { graphql } from "gatsby";
import { Markdown } from "../../util/mdParser";
import hljs from "highlight.js";
import "./BlogPost.css";
import "highlight.js/styles/monokai.css";
import Container from "@mui/material/Container";
import Layout from "../Layout/Layout";
import { Typography } from "@mui/material";

export default function Template({ data }) {
  const {
    markdownRemark: { frontmatter, html, rawMarkdownBody },
  } = data;

  useEffect(() => {
    hljs.configure({});
    hljs.highlightAll();
  }, []);

  return (
    <Layout pageTitle='Blog'>
      <Typography variant='h3'>{frontmatter.title}</Typography>
      <Typography variant='body2'>{frontmatter.date}</Typography>
      <div
        dangerouslySetInnerHTML={{
          __html: Markdown.parse(rawMarkdownBody, {
            ol: "list-group reset",
            ul: "list-group reset",
            li: "list-item",
            blockquote: "blockquote blockquote-info",
            h: false,
            indent: 4,
          }),
        }}
        // dangerouslySetInnerHTML={{
        //   __html: rawMarkdownBody,
        // }}
      />
    </Layout>
  );
}

export const pageQuery = graphql`
  query ($path: String!) {
    markdownRemark(frontmatter: { slug: { eq: $path } }) {
      frontmatter {
        slug
        title
        date(formatString: "YYYY-MM-DD")
      }
      html
      rawMarkdownBody
    }
  }
`;
