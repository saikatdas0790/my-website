import React from "react";
import { Link } from "gatsby";
import { css } from "@emotion/core";

const postListStyles = css`
  list-style: none;
  > li {
    margin: 1rem 0;
    padding: 1rem 0;
    transition: box-shadow 0.25s ease;
    > a {
      text-decoration: none;
      display: grid;
      grid-template-columns: 2fr 7fr 3fr;
      grid-template-areas:
        "icon title tags"
        "icon date tags"
        "icon excerpt .";
      align-items: center;
      color: black;
      > img {
        width: 4rem;
        height: 4rem;
        grid-area: icon;
        justify-self: center;
        margin-right: 1rem;
      }
      > h2 {
        grid-area: title;
      }
      > span:nth-of-type(1) {
        grid-area: date;
        opacity: 0.6;
      }
      > span:nth-of-type(2) {
        grid-area: tags;
        opacity: 0.6;
      }
      > p {
        grid-area: excerpt;
        font-size: 1rem;
        opacity: 0.8;
      }
      @media (max-width: 768px) {
        grid-template-columns: max-content 1fr;
        grid-template-areas:
          "icon title"
          "icon date"
          "icon tags"
          "icon excerpt";
      }
    }
  }
  > li:hover,
  > li:active {
    box-shadow: 0 2px 8px -1px rgba(0, 0, 0, 0.2),
      0 1px 8px 0 rgba(0, 0, 0, 0.14), 0 1px 8px 0 rgba(0, 0, 0, 0.12);
  }
`;

const PostList = ({ postListData }) => {
  return (
    <ul css={postListStyles}>
      {postListData.map(
        ({
          node: {
            frontmatter: { date, icon, tags, title },
            id,
            excerpt,
            fields: { slug },
          },
        }) => {
          return (
            <li key={id}>
              <Link to={slug}>
                <img src={`/images/post-icons/${icon}`} alt={`${icon} icon`} />
                <h2>{title}</h2>
                <span>{date}</span>
                <span>{tags.map(tag => `#${tag}`).join(" ")}</span>
                <p>{excerpt}</p>
              </Link>
            </li>
          );
        },
      )}
    </ul>
  );
};

export default PostList;
