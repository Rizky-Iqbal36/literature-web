import React, { useContext, useState } from 'react'
import {Modal,Button} from "react-bootstrap";
import {useMutation} from "react-query"
import {Context} from "../context/Context";
import {API} from "../config/api";
const Profile_addPP = (props) => {
    const [state,dispatch] = useContext(Context);
    const [image,setImage] = useState(null);

    const [updatePP] = useMutation(async () => {
    try {
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
      const formData = new FormData();
      formData.append("avatar", image, image.name);

      const res = await API.patch(`/users/${state.user.id}`, formData, config);

      console.log(res.data.data.user);
      dispatch({
        type: "UPDATE_PP_SUCCESS",
        payload: res.data.data.user,
      });
    } catch (err) {
      console.log(err.message);
    }
  });
    return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
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
              style={{backgroundColor:"#EE4622",color: "white"}}
              >Submit
            </Button>
          </form>
      </Modal.Body>
      <Modal.Footer>
        <Button
            onClick={props.onHide}         
            >Close</Button>
      </Modal.Footer>
    </Modal>
    )
}

export default Profile_addPP
