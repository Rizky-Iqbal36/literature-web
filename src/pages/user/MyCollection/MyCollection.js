import React, { useContext, useState, useEffect } from "react";
import { AiFillWarning } from "react-icons/ai";
import { Alert } from "react-bootstrap";
import { userContext } from "../../../context/userContext";
import { API } from "../../../config/api";
import { PageLoading } from "../../../components/Loading";
import NavbarUser from "../../../components/NavbarUser/NavbarUser";
import LoadLiterature from "../../../components/LoadLiterature/LoadLiterature";
import "./MyCollection.css";
const MyCollection = () => {
  const [state] = useContext(userContext);
  const [loading, setLoading] = useState(true);
  const [relations, setRelations] = useState([]);
  useEffect(() => {
    const loadRelation = async () => {
      try {
        setLoading(true);
        const res = await API.get("/relations");
        setRelations(res.data.data.loadRelations);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };
    loadRelation();
  }, []);
  const founded = relations.find((item) => item.UserId === state.user.id);
  console.log(founded);
  return (
    <div
      className="body"
      id="myCollection"
      style={{ backgroundColor: "#161616" }}
    >
      <NavbarUser />
      <main>
        <p style={{ paddingBottom: "41px" }}>My Collection</p>
        {loading ? (
          <PageLoading />
        ) : founded === undefined ? (
          <Alert variant="warning">
            <AiFillWarning />
            YOU DON'T HAVE ANY COLLECTION
          </Alert>
        ) : (
          <LoadLiterature route="COLLECTION" />
        )}
      </main>
    </div>
  );
};

export default MyCollection;
