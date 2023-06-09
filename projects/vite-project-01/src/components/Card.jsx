import { useState } from "react";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { Article, Aside, Header, Image, Info, UserName } from "../styles/card";

// eslint-disable-next-line react/prop-types
const Card = ({ name, userName, initialIsFollowing }) => {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

  console.log("[TwitterFollowCard] render with userName: ", userName);

  const text = isFollowing ? (
    <FontAwesomeIcon color="blue" icon={faThumbsUp} />
  ) : (
    <FontAwesomeIcon icon={faThumbsUp} />
  );
  const buttonClassName = isFollowing
    ? "Card-button is-following"
    : "Card-button";

  const handleClick = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <Article>
      <Header>
        <Image
          alt="El imagen de una persona"
          src={`https://i.kinja-img.com/gawker-media/image/upload/t_original/ijsi5fzb1nbkbhxa2gc1.png`}
        />
        <Info>
          <strong>{name}</strong>
          <UserName>@{userName}</UserName>
        </Info>
      </Header>

      <Aside>
        <Button className={buttonClassName} onClick={handleClick}>
          <span className="Card-text">{text} Me gusta</span>
          <span className="Card-stopFollow">Dejar de seguir</span>
        </Button>
      </Aside>
    </Article>
  );
};

export default Card;
