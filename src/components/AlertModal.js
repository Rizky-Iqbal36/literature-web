import React from "react";
import { Modal, Alert } from "react-bootstrap";

const pStyle = {
  textAlign: "center",
  fontSize: 20,
  padding: "10px 30px",
  color: "#AF2E1C",
  justifyContent: "center",
  alignItems: "center",
};

const AlertModal = (props) => {
  return (
    <Modal {...props} size="lg" centered id="addSuccess">
      <Alert variant="none" style={{ margin: "0", backgroundColor: "#161616" }}>
        <p style={pStyle}>{props.children}</p>
      </Alert>
    </Modal>
  );
};

export default AlertModal;
