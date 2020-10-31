import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";
import NavbarUser from "../components/NavbarUser";
import AlertModal from "./AlertModal";
import { BsCloudDownload, BsBookmark } from "react-icons/bs";
import { urlAsset } from "../config/api";
import { Context } from "../context/Context";
const Detail = () => {
  const { id } = useParams();
  const [state] = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [literature, setLiterature] = useState([]);
  const [relations, setRelations] = useState([]);
  const [click, setClick] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [show, setShow] = useState("");
  const [FormData, setFormData] = useState({
    UserId: state.user.id,
    LiteratureId: id,
  });
  const { UserId, LiteratureId } = FormData;
  useEffect(() => {
    const getLiterature = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/literature/${id}`);
        setLiterature(res.data.data.detailLiterature);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };
    getLiterature();
  }, []);

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
    setClick(false);
  }, [click]);

  const [remove] = useMutation(async () => {
    try {
      setLoading(true);
      const res = await API.delete(`/relation/${id}/${state.user.id}`);
      setLoading(false);
      setClick(true);
      setShow("remove");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  });
  const [add] = useMutation(async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({ LiteratureId, UserId });
      const res = await API.post("/relation", body, config);
      setLoading(false);
      setClick(true);
      setShow("add");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  });
  const isBookmark = relations.filter(
    (item) => item.UserId == state.user.id && item.LiteratureId == id
  );
  console.log(literature);
  return (
    <div style={{ backgroundColor: "#161616" }}>
      {loading || !literature ? (
        <h1>Now Loading...</h1>
      ) : (
        <div>
          <NavbarUser />
          <div
            className="container"
            style={{ color: "white", paddingBottom: "222.5px" }}
          >
            <div className="row" style={{ marginLeft: "-40px" }}>
              <div className="col">
                <img
                  //src={require(`../../../server/public/thumbnails/${literature.thumbnail}`)}
                  src={urlAsset.thumbnail + literature.thumbnail}
                  style={{
                    width: "300px",
                    height: "auto",
                    borderRadius: "10px",
                  }}
                />
              </div>
              <div className="col">
                <div className="float-left" style={{ marginLeft: "-240px" }}>
                  <div style={{ paddingBottom: "24px" }}>
                    <div
                      style={{
                        fontFamily: "times news roman",
                        fontSize: "32px",
                        fontWeight: "bold",
                      }}
                    >
                      {literature.title}
                    </div>
                    <div
                      style={{
                        color: "#929292",
                        font: "avenir",
                        fontSize: "20px",
                      }}
                    >
                      {literature.author}
                    </div>
                  </div>
                  <div style={{ paddingBottom: "24px", font: "avenir" }}>
                    <div
                      style={{
                        fontSize: "22px",
                        fontWeight: "bold",
                      }}
                    >
                      Publication Date
                    </div>
                    <div style={{ color: "#929292", fontSize: "18px" }}>
                      {literature.month} {literature.year}
                    </div>
                  </div>
                  <div style={{ paddingBottom: "24px", font: "avenir" }}>
                    <div
                      style={{
                        fontSize: "22px",
                        fontWeight: "bold",
                      }}
                    >
                      Pages
                    </div>
                    <div style={{ color: "#929292" }}>{literature.pages}</div>
                  </div>
                  <div style={{ paddingBottom: "24px", font: "avenir" }}>
                    <div
                      style={{
                        fontSize: "22px",
                        fontWeight: "bold",
                        color: "#AF2E1C",
                      }}
                    >
                      ISBN
                    </div>
                    <div style={{ color: "#929292", fontSize: "18px" }}>
                      {literature.ISBN}
                    </div>
                  </div>
                  <div>
                    <Button
                      variant="none"
                      style={{
                        background: "#EE4622",
                        color: "white",
                        font: "avenir",
                      }}
                      href={urlAsset.file + literature.file}
                      target="_blank"
                    >
                      Download
                      <BsCloudDownload
                        size={30}
                        style={{ marginLeft: "14px" }}
                      />
                    </Button>
                  </div>
                </div>
                <div className="float-right">
                  {isBookmark.length === 0 ? (
                    <Button
                      variant="none"
                      style={{
                        background: "#EE4622",
                        color: "white",
                        font: "avenir",
                      }}
                      onClick={() => {
                        add();
                        setShowAlert(true);
                        setShow("");
                      }}
                    >
                      Add My Collection
                      <BsBookmark size={30} />
                    </Button>
                  ) : (
                    <Button
                      variant="none"
                      style={{
                        background: "#EE4622",
                        color: "white",
                        font: "avenir",
                      }}
                      onClick={() => {
                        remove();
                        setShowAlert(true);
                        setShow("");
                      }}
                    >
                      Remove from My Collection
                      <BsBookmark size={30} />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <AlertModal show={showAlert} onHide={() => setShowAlert(false)}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {show === "remove" ? (
                <p>
                  Your literature has been successfully removed from your
                  collection
                </p>
              ) : (
                <p>
                  Your literature has been successfully added to your collection
                </p>
              )}
            </div>
          </AlertModal>
        </div>
      )}
    </div>
  );

  /*return isLoading || !literature ? (
    <h1>Loading...</h1>
  ) : error ? (
    <h1>error {error.message} </h1>
  ) : (
      <div className="container" style={{color:"white", paddingBottom:"100px"}}>
        <div
            className="row"
            style={{
                fontFamily: "times news roman",
                fontSize: "20px",
                fontWeight: "bold",
                lineHeight: "101.5%",
                marginBottom: "39px",
            }}>
            DETAIL Literature dengan id : {id}
        </div>
    </div>        
    )*/
};
export default Detail;
