import React from "react";
import Helmet from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

function SEO({ description, lang, meta, title, pageName }) {
  const {
    site: {
      siteMetadata: {
        title: defaultTitle,
        description: defaultDescription,
        author: defaultAuthor
      }
    }
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  );

  const metaDescription = description || defaultDescription;

  return (
    <Helmet
      htmlAttributes={{
        lang
      }}
      title={title || defaultTitle}
      titleTemplate={pageName && `%s | ${pageName}`}
      meta={[
        {
          name: `description`,
          content: metaDescription
        },
        {
          property: `og:title`,
          content: title || defaultTitle
        },
        {
          property: `og:description`,
          content: metaDescription
        },
        {
          property: `og:type`,
          content: `website`
        },
        {
          name: `twitter:card`,
          content: `summary`
        },
        {
          name: `twitter:creator`,
          content: defaultAuthor
        },
        {
          name: `twitter:title`,
          content: title || defaultTitle
        },
        {
          name: `twitter:description`,
          content: metaDescription
        }
      ].concat(meta)}
    />
  );
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``
};

export default SEO;
