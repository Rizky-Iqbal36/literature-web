import React, { useContext, useEffect, useState } from "react";
import LoadLiterature from "../../components/LoadLiterature";
import { Context } from "../../context/Context";
import { API } from "../../config/api";
import NavbarUser from "../../components/NavbarUser";
const MyCollection = () => {
  const [state, dispatch] = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [relations, setRelations] = useState([]);
  useEffect(() => {
    const loadRelation = async () => {
      try {
        setLoading(true);
        const res = await API.get("/relation");
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
    <>
      <NavbarUser />
      <div style={{ backgroundColor: "#161616" }}>
        <div
          className="container"
          style={{
            color: "white",
            paddingBottom: "89px",
            marginLeft: "78px",
          }}
        >
          <div
            className="row"
            style={{
              fontFamily: "times news roman",
              fontSize: "36px",
              fontWeight: "bold",
              lineHeight: "101.5%",
              marginBottom: "41px",
            }}
          >
            My Collection
          </div>
          {!loading && founded !== undefined ? (
            <div style={{ marginLeft: "-20px", marginTop: "-28px" }}>
              <LoadLiterature route="COLLECTION" />
            </div>
          ) : (
            <div style={{ margin: "45px 0px 275px -15px" }}>
              <h1>YOU DON'T HAVE ANY COLLECTION</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyCollection;
