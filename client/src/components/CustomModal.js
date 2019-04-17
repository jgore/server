import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { MdClose } from 'react-icons/md'
import PropTypes from 'prop-types'

const CustomModal = ({ Body, Header, Footer, isModal, handleClose, ...options }) => {
    return (
        <Modal onHide={() => handleClose()} show={isModal} {...options}>
            <Modal.Header>
                <Modal.Title>
                    {
                        Header ?
                            <Header /> :
                            ""
                    }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    Body ?
                        <Body /> :
                        ""
                }
            </Modal.Body>
            <Modal.Footer>
                {
                    Footer ?
                        <Footer onClick={handleClose} /> :
                        <Button className="google-button" onClick={() => handleClose()}>
                            <MdClose /> Zamknij
                        </Button>
                }
            </Modal.Footer>
        </Modal>
    )
}

CustomModal.propTypes = {
    isModal: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired
}

export default CustomModal