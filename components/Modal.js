import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from "../styles/modal.module.css";
import ModalContent from "../components/ModalContent";

const Modal = ({ show, onClose, staffDetails }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <div className={styles.styledModalOverlay}>
      <div className={styles.styledModal}>
        <div className={styles.styledModalHeader}>
          <h1>Staff Summary</h1>
          <button onClick={handleCloseClick}>x</button>
        </div>
        <div className={styles.styledModalGuts}>
          <div className={styles.styledModalBody}>
            <p>
              <strong>Name: </strong> {staffDetails[0].fullName}
            </p>
            <p>
              <strong>Current number of days stayed: </strong>
              {staffDetails.length}
            </p>
            <p>
              <strong>Room No. : </strong> {staffDetails[0].roomNumber}
            </p>
          </div>
          <div>
            {staffDetails.map((sheet, i) => (
              <ModalContent sheet={sheet} key={i} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
};

export default Modal;
