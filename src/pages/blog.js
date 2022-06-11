import { List, ListItem, ListItemText } from "@mui/material";
import { graphql, Link } from "gatsby";
import * as React from "react";

const BlogPage = ({ data }) => {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {data.allMarkdownRemark.edges.map((edge) => (
        <ListItem key={edge.node.id}>
          <ListItemText
            primary={
              <Link to={edge.node.frontmatter.slug}>
                {edge.node.frontmatter.title}
              </Link>
            }
            secondary={edge.node.frontmatter.author}
          />
        </ListItem>
      ))}
    </List>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            title
            slug
            date(formatString: "YYYY-MM-DD HH:mm")
            categories
            tags
            author
          }
          wordCount {
            words
          }
          id
        }
      }
    }
  }
`;

export default BlogPage;
