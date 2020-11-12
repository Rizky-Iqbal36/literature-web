import React, { useContext, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useMutation } from "react-query";
import { userContext } from "../context/userContext";
import { API } from "../config/api";
import AlertModal from "./AlertModal";
import { ActionLoading } from "./Loading";
const Profile_addPP = (props) => {
  const [state] = useContext(userContext);
  const [image, setImage] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [updatePP] = useMutation(async () => {
    try {
      setIsLoading(true);
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
      const formData = new FormData();
      formData.append("avatar", image, image.name);

      const res = await API.patch(`/users/${state.user.id}`, formData, config);

      setShowAlert(true);
      props.refetch();
      setIsLoading(false);
    } catch (err) {
      console.log(err.message);
      setIsLoading(false);
    }
  });
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ color: "white" }}
    >
      <div style={{ backgroundColor: "#161616" }}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Change Photo Profile
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updatePP();
            }}
          >
            <div className="form-group">
              <div className="custom-file">
                <input
                  type="file"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                  id="image"
                />
              </div>
            </div>
            <Button
              variant="none"
              type="submit"
              style={{ backgroundColor: "#EE4622", color: "white" }}
            >
              {isLoading ? <ActionLoading /> : "Submit"}
            </Button>
            <AlertModal show={showAlert} onHide={() => setShowAlert(false)}>
              <p>Your photo profile has been successfully changed</p>
            </AlertModal>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default Profile_addPP;
