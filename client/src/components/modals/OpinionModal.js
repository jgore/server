import React from "react";
import CustomModal from "../CustomModal";
import PropTypes from "prop-types";
import { Image, Button } from "react-bootstrap";
import { PUBLIC_RESOURSES_URL } from "../../utils/variables";
import StarRating from "../ReactStars";

const Header = ({ title }) => <h3>{title}</h3>;

const Footer = ({ onClick }) => (
  <Button
    className="fixed-button call-button"
    size="lg"
    onClick={e => onClick(e)}
    style={{ minWidth: 200 }}
  >
    Zamknij
  </Button>
);

const Opinions = ({ reviews }) => {
  return (
    <div>
      {reviews.map((value, index) => {
        console.log(value);
        return (
          <Opinion
            key={index}
            path={`${PUBLIC_RESOURSES_URL}/${value.image}`}
            {...value}
          />
        );
      })}
    </div>
  );
};

export const Opinion = ({ username, content, grade, path, createdAt }) => (
  <div className="opinion">
    <div className="opinion__image">
      <Image src={path} rounded />
    </div>
    <div className="opinion__content">
      <h5>{username}</h5>
      <StarRating
        className="opinion__content__stars"
        size={25}
        count={5}
        value={grade}
        edit={false}
      />
      <p>{content}</p>
      <b>{createdAt.substring(0, 10)}</b>
    </div>
  </div>
);

Opinion.propTypes = {
  image: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  grade: PropTypes.number.isRequired
};

Opinions.propTypes = {
  reviews: PropTypes.array.isRequired
};

export default ({ reviews, ...props }) => {
  return (
    <CustomModal
      Body={() => Opinions({ reviews })}
      Header={() => Header({ title: "Opinie o kursie" })}
      Footer={props => Footer(props)}
      size="lg"
      centered
      {...props}
    />
  );
};
