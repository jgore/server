import React from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";

const CustomModal = ({ handleClose, isModal, ...props }) => {
  return (
    <Modal onHide={() => handleClose()} show={isModal} {...props}>
      {props.children}
    </Modal>
  );
};

CustomModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  isModal: PropTypes.bool.isRequired
};

export default CustomModal;
