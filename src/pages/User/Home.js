import React from "react";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import NavbarUser from "../../components/NavbarUser";
import Icon from "../../asset/Vector.png";
const Home = () => {
  const history = useHistory();
  return (
    <div style={{ color: "white", backgroundColor: "#161616" }}>
      <NavbarUser />
      <div
        style={{
          padding: "142px 383px 406px 395px",
        }}
      >
        <div style={{ marginBottom: "51px" }}>
          <img
            className="responsive-img"
            src={Icon}
            alt="Logo"
            style={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
        </div>
        <div style={{ marginLeft: "-40px" }}>
          <Form style={{ display: "flex", flexDirection: "row" }}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Search for literature"
                name="title"
                style={{
                  color: "white",
                  backgroundColor: "#454545",
                  width: "600px",
                  height: "50px",
                  borderWidth: "2px",
                  borderRadius: "5px",
                }}
              />
            </Form.Group>
            <Button
              style={{
                backgroundColor: "#AF2E1C",
                height: "50px",
                marginLeft: "12px",
              }}
              onClick={() => history.push("/SearchPage")}
            >
              <BsSearch size={30} />
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Home;
