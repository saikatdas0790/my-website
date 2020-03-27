/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link } from "gatsby";

const postListStyles = {
  listStyle: "none",
  paddingLeft: "0",
  "> li": {
    margin: "1rem 0",
    padding: "1rem 0",
    transition: "box-shadow 0.25s ease",
    ":hover, :active": {
      // fix shadows for dark mode
      boxShadow: `0 2px 8px -1px rgba(0, 0, 0, 0.2),
             0 1px 8px 0 rgba(0, 0, 0, 0.14), 0 1px 8px 0 rgba(0, 0, 0, 0.12)`,
    },
    "> a": {
      textDecoration: "none",
      display: "grid",
      gridTemplateColumns: ["max-content 1fr", "2fr 7fr 3fr"],
      gridTemplateAreas: [
        `
        "icon title"
        "icon date"
        "icon tags"
        "icon excerpt"
      `,
        `
        "icon title tags"
        "icon date tags"
        "icon excerpt ."`,
      ],
      alignItems: "center",
      color: "text",
      "> img": {
        width: "4rem",
        height: "4rem",
        gridArea: "icon",
        justifySelf: "center",
        marginRight: "1rem",
      },
      "> h2": {
        gridArea: "title",
        margin: "0",
      },
      "> span:nth-of-type(1)": {
        gridArea: "date",
        opacity: 0.6,
      },
      "> span:nth-of-type(2)": {
        gridArea: "tags",
        opacity: 0.6,
      },
      "> p": {
        gridArea: "excerpt",
        fontSize: "1rem",
        opacity: 0.9,
      },
    },
  },
};

const PostList = ({ postListData }) => {
  return (
    <ul sx={postListStyles}>
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
