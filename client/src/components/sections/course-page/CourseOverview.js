import React from "react";
import { PUBLIC_RESOURCES_URL } from "../../../utils/variables";
import { Button, Col, Image, Row } from "react-bootstrap";
import Stars from "../../helpers/ReactStars";
import { LinkContainer } from "react-router-bootstrap";
import { GoMegaphone } from "react-icons/go";
import AddOpinionModal from "../../modals/AddOpinionModal";
import { MdOpenInNew, MdStarBorder } from "react-icons/md";
import PropTypes from "prop-types";
import OpinionModal from "../../modals/OpinionModal";

const CourseOverview = ({
  course: {
    image,
    title,
    price,
    duration,
    averageRate,
    shortDescription,
    reviews
  },
  isReviewed,
  isAddModalOpen,
  opinion,
  auth,
  logout,
  addOpinionModalEvents: {
    handleAddModalOpen,
    handleAddModalClose,
    onChangeAddModal,
    onRatingChangeAddModal,
    addOpinion
  },
  opinionModalEvents: {
    handleOpinionModalOpen,
    handleOpinionModalClose,
    isOpinionModalOpen
  }
}) => {
  console.log(isAddModalOpen);
  return (
    <Row>
      <Col sm="12" md="5">
        <Image src={`../${PUBLIC_RESOURCES_URL}/${image}`} fluid />
      </Col>
      <Col sm="12" md="7">
        <h2>{title}</h2>
        <p>
          <b>Cena:</b> {price}
        </p>
        <p>
          <b>Czas trwania:</b>: {duration}
        </p>
        <div className="flexible flexible-horizontal-center">
          <b>Średnia ocena: </b>
          {averageRate}
          {typeof averageRate === "number" ? (
            <React.Fragment>
              <Stars
                size={20}
                className="starses"
                count={5}
                value={averageRate}
                edit={false}
              />
            </React.Fragment>
          ) : (
            ""
          )}
        </div>
        <p>
          <b>Opis: </b>
          {shortDescription}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <LinkContainer to="/contact">
            <a className="flexible flexible-horizontal-center call-button">
              <GoMegaphone />
              Zacznij już dziś !!!
            </a>
          </LinkContainer>
          {auth ? (
            <React.Fragment>
              <Button
                size="lg"
                style={{
                  marginLeft: "0.5rem",
                  marginTop: "1rem",
                  fontSize: "18px",
                  fontWeight: "500",
                  boxShadow: "0px 0px 5px 1px rgba(0,0,0,0.75)",
                  borderRadius: "0.25rem"
                }}
                onClick={handleAddModalOpen}
                variant="success"
              >
                <MdOpenInNew />
                {isReviewed ? "Edytuj Opinię" : "Dodaj Opinię"}
              </Button>

              <AddOpinionModal
                handleClose={handleAddModalClose}
                isOpen={isAddModalOpen}
                onChange={onChangeAddModal}
                onRatingChange={onRatingChangeAddModal}
                grade={opinion.grade}
                addOpinion={addOpinion}
                auth={auth}
                logout={logout}
                isReviewed={isReviewed}
                review={opinion}
              />
            </React.Fragment>
          ) : (
            ""
          )}

          {reviews.length > 0 ? (
            <Button
              className="flexible flexible-horizontal-center call-button"
              style={{
                marginLeft: ".5rem",
                marginTop: "1rem",
                background: "#007bff",
                borderRadius: "0.25rem"
              }}
              onClick={handleOpinionModalOpen}
            >
              <MdStarBorder />
              Pokaż opinie
            </Button>
          ) : (
            ""
          )}
        </div>
      </Col>
      <OpinionModal
        isModal={isOpinionModalOpen}
        reviews={reviews}
        handleClose={handleOpinionModalClose}
        imagePath={`../${PUBLIC_RESOURCES_URL}`}
      />
    </Row>
  );
};

CourseOverview.propTypes = {
  course: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.string,
    duration: PropTypes.string,
    averageRate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    shortDescription: PropTypes.string
  })
};

export default CourseOverview;
