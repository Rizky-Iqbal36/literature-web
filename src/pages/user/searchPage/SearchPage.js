import React, { useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import LoadLiterature from "../../../components/LoadLiterature/LoadLiterature";
import NavbarUser from "../../../components/NavbarUser/NavbarUser";
import "./SearchPage.css";
const SearchPage = (props) => {
  const [selected, setSelected] = useState("Anytime");
  const [title, setTitle] = useState(props.location.state.isSearch);

  console.log(props.location.state.isSearch);
  var today = new Date();

  let year = [];
  var minYear = today.getFullYear() - 20;

  for (let i = 0; i <= 20; i++) {
    year[i] = minYear + i;
  }
  return (
    <div
      className="body"
      id="searchPage"
      style={{ backgroundColor: "#161616" }}
    >
      <NavbarUser />
      <main>
        <div id="content">
          <section id="search">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search for literature"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              style={{
                backgroundColor: "#AF2E1C",
                height: "50px",
                marginLeft: "12px",
              }}
              onClick={() => setTitle("")}
            >
              Clear
            </Button>
          </section>
          <section id="literature">
            <Dropdown
              drop="down"
              onSelect={(e) => {
                setSelected(e);
              }}
            >
              <Dropdown.Toggle variant="danger" id="dropdown-basic">
                {selected === "Anytime" ? `Anytime` : `Since ${selected}`}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="Anytime">Anytime</Dropdown.Item>
                {year.map((year, index) => {
                  return (
                    <Dropdown.Item eventKey={year} key={index} as={Button}>
                      Since {year}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
            <LoadLiterature route="HOME" selected={selected} title={title} />
          </section>
        </div>
      </main>
    </div>
  );
};

export default SearchPage;
