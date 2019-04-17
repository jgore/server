import React from "react";
import { Modal, FormControl, Button, Form } from "react-bootstrap";
import Stars from "../ReactStars";

export default ({
  handleClose,
  isOpen,
  onChange,
  onRatingChange,
  grade,
  addOpinion,
  auth
}) => {
  console.log(auth)
  return (
    <Modal show={isOpen} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Dodaj opinię</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Label>Treść</Form.Label>
        <FormControl
          as="textarea"
          aria-label="With textarea"
          style={{ height: 200, resize: "none" }}
          onChange={onChange}
          name="content"
        />
        <Form.Label style={{ marginTop: "3rem" }}>Ocena</Form.Label>
        <Stars
          size={30}
          className="starses"
          count={5}
          onChange={onRatingChange}
          edit={true}
          value={grade}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => addOpinion(auth)}>
          Dodaj
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Zamknij
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
