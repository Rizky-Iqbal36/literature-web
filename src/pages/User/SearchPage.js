import React from "react";
import { Form, Button, Dropdown } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import LoadLiterature from "../../components/LoadLiterature";
import NavbarUser from "../../components/NavbarUser";
const SearchPage = () => {
  const handleSubmit = () => {
    console.log("Submit");
  };
  return (
    <div style={{ color: "white", backgroundColor: "#161616" }}>
      <NavbarUser />
      <div
        className="container"
        style={{
          marginLeft: "78px",
          paddingBottom: "400px",
          backgroundColor: "#161616",
        }}
      >
        <div className="row">
          <Form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "row" }}
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
              />
            </Form.Group>
            <Button
              type="submit"
              style={{
                backgroundColor: "#AF2E1C",
                height: "50px",
                marginLeft: "12px",
              }}
            >
              <BsSearch size={30} />
            </Button>
          </Form>
        </div>
        <div className="row" style={{ marginLeft: "-30px", marginTop: "51px" }}>
          <div className="col-2" style={{ alignContent: "center" }}>
            <div
              style={{ marginLeft: "20px", font: "avenir", fontSize: "16px" }}
            >
              <h6
                style={{
                  color: "#AF2E1C",
                }}
              >
                Anytime
              </h6>
            </div>
            <Dropdown drop="bottom">
              <Dropdown.Toggle
                variant="danger"
                id="dropdown-basic"
                style={{
                  backgroundColor: "#454545",
                  color: "white",
                  outline: "none",
                  borderWidth: "2px",
                  borderColor: "white",
                }}
              >
                Since 2020
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="All">Since 2020</Dropdown.Item>
                <Dropdown.Item eventKey="View">View</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="col-10" style={{ marginTop: "-80px" }}>
            <LoadLiterature route="HOME" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
