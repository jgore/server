import React from "react";
import { PUBLIC_RESOURSES_URL } from "../../../utils/variables";
import { Button, Col, Image, Row } from "react-bootstrap";
import Stars from "../../helpers/ReactStars";
import { LinkContainer } from "react-router-bootstrap";
import { GoMegaphone } from "react-icons/go";
import AddOpinionModal from "../../modals/AddOpinionModal";
import { MdOpenInNew } from "react-icons/md";
import PropTypes from "prop-types";

const CourseOverview = ({
  course: { image, title, price, duration, averageRate, shortDescription },
  isReviewed,
  isAddModalOpen,
  opinion,
  auth,
  logout,
  opinionModalEvents: {
    handleAddModalOpen,
    handleAddModalClose,
    onChangeAddModal,
    onRatingChangeAddModal,
    addOpinion
  }
}) => {
  console.log(isAddModalOpen);
  return (
    <Row>
      <Col sm="12" md="5">
        <Image src={`../${PUBLIC_RESOURSES_URL}/${image}`} fluid />
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
                fontSize: "26px",
                fontWeight: "500",
                boxShadow: "0px 0px 5px 1px rgba(0,0,0,0.75)"
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
      </Col>
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
