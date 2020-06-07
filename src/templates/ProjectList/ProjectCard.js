/** @jsx jsx */
import { jsx } from "theme-ui";

const ProjectCard = ({
  project: { createdOn, description, showcase, title, url },
}) => {
  return (
    <li>
      <h2>{title}</h2>
      <time dateTime={createdOn}>
        {new Intl.RelativeTimeFormat("en").format(createdOn)}
      </time>
      <p>{description}</p>
    </li>
  );
};

export default ProjectCard;
