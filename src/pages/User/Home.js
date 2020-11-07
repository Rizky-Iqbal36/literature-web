import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import NavbarUser from "../../components/NavbarUser";
import Icon from "../../asset/Vector.png";
const Home = () => {
  const [isSearch, setIsSearch] = useState("");
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
        <div style={{ marginLeft: "-45px" }}>
          <Form
            style={{ display: "flex", flexDirection: "row" }}
            onSubmit={(e) => e.preventDefault()}
          >
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
                onChange={(e) => setIsSearch(e.target.value)}
              />
            </Form.Group>
            <Button
              style={{
                backgroundColor: "#AF2E1C",
                height: "50px",
                marginLeft: "12px",
              }}
              onClick={() =>
                history.push({
                  pathname: "/SearchPage",
                  state: {
                    isSearch: isSearch,
                  },
                })
              }
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
