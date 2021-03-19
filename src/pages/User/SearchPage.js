import React, { useEffect, useState } from "react";
import { Form, Button, Dropdown } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import LoadLiterature from "../../components/LoadLiterature";
import NavbarUser from "../../components/NavbarUser";

const SearchPage = () => {
  const [selected, setSelected] = useState("Anytime");
  const [title, setTitle] = useState();
  const year = [
    2010,
    2011,
    2012,
    2013,
    2014,
    2015,
    2016,
    2017,
    2018,
    2019,
    2020,
    2021,
    2022,
    2023,
  ];
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
          <div className="form-group">
            <input
              type="text"
              className="form-control"
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
          >
            <BsSearch size={30} />
          </Button>
        </div>
        <div className="row" style={{ marginTop: "51px" }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div className="col-1" style={{ alignContent: "center" }}>
              <Dropdown
                drop="down"
                onSelect={(e) => {
                  setSelected(e);
                }}
              >
                <Dropdown.Toggle
                  variant="danger"
                  id="dropdown-basic"
                  style={{
                    backgroundColor: "#161616",
                    color: "white",
                    outline: "none",
                    borderWidth: "2px",
                    borderColor: "white",
                  }}
                >
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
            </div>
            <div
              className="col-11"
              style={{
                marginTop: "-80px",
                marginLeft: "72px",
              }}
            >
              <LoadLiterature route="HOME" selected={selected} title={title} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
