import React, { useState } from "react";
import NavbarUser from "../../../components/NavbarUser/NavbarUser";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import Icon from "../../../asset/Vector.png";
import "./Home.css";
const Home = () => {
  const [isSearch, setIsSearch] = useState("");
  const history = useHistory();
  return (
    <div className="body" id="home" style={{ backgroundColor: "#161616" }}>
      <NavbarUser />
      <main id="home">
        <div className="content">
          <img className="responsive-img" src={Icon} alt="Logo" />
          <section>
            <Form
              style={{ display: "flex", flexDirection: "row" }}
              onSubmit={(e) => e.preventDefault()}
            >
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Search for literature"
                  name="title"
                  onChange={(e) => setIsSearch(e.target.value)}
                />
              </Form.Group>
              <Button
                variant="none"
                type="submit"
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
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;
