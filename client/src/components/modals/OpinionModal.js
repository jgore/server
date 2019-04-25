import React from "react";
import CustomModal from "./CustomModal";
import PropTypes from "prop-types";
import { Image, Button } from "react-bootstrap";
import { PUBLIC_RESOURSES_URL } from "../../utils/variables";
import StarRating from "../helpers/ReactStars";
import { Modal } from "react-bootstrap";

const Opinions = ({ reviews }) => (
  <div>
    {reviews.map((value, index) => {
      return (
        <Opinion
          key={index}
          path={`${PUBLIC_RESOURSES_URL}/${value.user.image}`}
          {...value}
        />
      );
    })}
  </div>
);

Opinions.propTypes = {
  reviews: PropTypes.array.isRequired
};

export const Opinion = ({ user, content, grade, path, createdAt }) => (
  <div className="opinion">
    <div className="opinion__image">
      <Image src={path} rounded />
    </div>
    <div className="opinion__content">
      <h5>{user.name}</h5>
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
  user: PropTypes.object.isRequired,
  content: PropTypes.string.isRequired,
  grade: PropTypes.number.isRequired,
  path: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired
};

const OpinionModal = ({ reviews, handleClose, ...props }) => (
  <CustomModal size="lg" centered {...props} handleClose={handleClose}>
    <Modal.Header>
      <Modal.Title>Opinie</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Opinions reviews={reviews} />
    </Modal.Body>
    <Modal.Footer>
      <Button
        className="fixed-button call-button"
        size="lg"
        onClick={e => handleClose(e)}
        style={{ minWidth: 200 }}
      >
        Zamknij
      </Button>
    </Modal.Footer>
  </CustomModal>
);

OpinionModal.propTypes = {
  reviews: PropTypes.array.isRequired,
  handleClose: PropTypes.func.isRequired
}

export default OpinionModal;
