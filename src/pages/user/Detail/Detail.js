import React, { useEffect, useContext, useState } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { BsCloudDownload, BsBookmark } from "react-icons/bs";
import { API, urlAsset } from "../../../config/api";
import { userContext } from "../../../context/userContext";
import { PageLoading } from "../../../components/Loading";
import AlertModal from "../../../components/AlertModal";
import NavbarUser from "../../../components/NavbarUser/NavbarUser";
import "./Detail.css";
const Detail = () => {
  const { id } = useParams();
  const [state] = useContext(userContext);
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
        const res = await API.get("/relations");
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
  return (
    <div className="body" id="Detail" style={{ backgroundColor: "#161616" }}>
      <NavbarUser />
      {loading || !literature ? (
        <PageLoading />
      ) : (
        <main>
          <div className="container-fluid">
            <div id="content">
              <div className="row-6" id="image">
                <img
                  src={urlAsset.photo + literature.thumbnail}
                  alt={literature.title}
                />
              </div>
              <div className="row-6" id="data">
                <div id="left">
                  <div id="information">
                    <div
                      id="title"
                      className="text-justify"
                      style={{
                        fontSize:
                          literature.title?.length > 20
                            ? "28px"
                            : literature.title?.length > 40
                            ? "24"
                            : null,
                        lineHeight:
                          literature.title?.length > 20
                            ? "28px"
                            : literature.title?.length > 40
                            ? "24"
                            : null,
                      }}
                    >
                      {literature.title}
                    </div>
                    <div id="author">{literature.author}</div>
                  </div>
                  <div id="information">
                    <div id="detail">Publication Date</div>
                    <div id="data">
                      {literature.month} {literature.year}
                    </div>
                  </div>
                  <div id="information">
                    <div id="detail">Pages</div>
                    <div id="data">{literature.pages}</div>
                  </div>
                  <div id="information">
                    <div id="detail2">ISBN</div>
                    <div id="data">{literature.ISBN}</div>
                  </div>
                  <div>
                    <Button
                      variant="none"
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
                <div id="right">
                  {isBookmark.length === 0 ? (
                    <Button
                      variant="none"
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
        </main>
      )}
    </div>
  );
};

export default Detail;
