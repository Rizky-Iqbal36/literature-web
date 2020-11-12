import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { API, urlAsset } from "../../config/api";
import { userContext } from "../../context/userContext";
import { Alert } from "react-bootstrap";
import { AiFillWarning } from "react-icons/ai";
import { PageLoading } from "../Loading";
import "./LoadLiterature.css";
const LoadLiterature = (props) => {
  const [state, dispatch] = useContext(userContext);
  const [literatures, setLiteratures] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  useEffect(() => {
    const loadLiterature = async () => {
      try {
        setLoading(true);
        if (props.selected === "Anytime" || props.route === "PROFILE") {
          if (props.title) {
            const res = await API.get(`/filterLiterature/${props.title}`);
            setLiteratures(res.data.data.filterLiterature);
          } else {
            const res = await API.get("/literature");
            setLiteratures(res.data.data.loadLiterature);
          }
        } else if (props.route === "COLLECTION") {
          const res = await API.get(`/user/${state.user.id}`);
          setLiteratures(res.data.data.loadUser.literatures);
        } else if (props.selected !== "Anytime") {
          if (!props.title) {
            const res = await API.get(`/literatures/${props.selected}`);
            setLiteratures(res.data.data.filterLiterature);
          } else {
            const res = await API.get(
              `/searchLiterature/${props.title}/${props.selected}`
            );
            setLiteratures(res.data.data.literatures);
          }
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };
    loadLiterature();
  }, [props.selected, props.title]);

  const founded = literatures.find((item) => item.uploadBy === state.user.id);
  console.log(founded);
  return loading || !literatures ? (
    <PageLoading />
  ) : literatures.length === 0 ? (
    <Alert variant="warning">
      <p>
        <AiFillWarning style={{ marginTop: "-10px" }} />
        THERE IS NO LITERATURE IN HERE
      </p>
    </Alert>
  ) : props.route !== "PROFILE" ? (
    <div id="loadLiterature" className="row">
      {literatures.map((item, index) => {
        if (item.status === "Approved") {
          return (
            <div
              className="col-md-3"
              onClick={() => history.push(`/Detail/${item.id}`)}
            >
              <img
                src={urlAsset.photo + item.thumbnail}
                className="responsive-img"
              />
              <p id="title">{item.title}</p>
              <div id="subContent">
                <div className="left">{item.author}</div>
                <div className="right">{item.year}</div>
              </div>
            </div>
          );
        }
      })}
    </div>
  ) : founded === undefined ? (
    <Alert variant="warning">
      <AiFillWarning />
      YOU DON'T HAVE ANY LITERATURE
    </Alert>
  ) : (
    <div id="literatureByUser" className="row">
      {literatures.map((item, index) => {
        if (item.uploadBy === state.user?.id) {
          return (
            <div
              className="col-md-3"
              onClick={() =>
                item.status === "Approved"
                  ? history.push(`/Detail/${item.id}`)
                  : null
              }
              style={{
                cursor: item.status === "Approved" ? "pointer" : "default",
                backgroundColor:
                  item.status === "Approved"
                    ? "#161616"
                    : "rgb(196,196,196,0.7)",
              }}
            >
              <div className="container-fluid">
                <img
                  src={urlAsset.photo + item.thumbnail}
                  className="responsive-img"
                  alt={item.thumbnail}
                />
                {item.status === "Cancel" ? (
                  <p id="cancel">literature Canceled</p>
                ) : item.status === "Waiting to be verified" ? (
                  <p id="waiting">Waiting to be verified</p>
                ) : null}
              </div>
              <p id="title">{item.title}</p>
              <div id="subContent">
                <div
                  className="float-left"
                  style={{
                    color: item.status === "Approved" ? "#929292" : "white",
                  }}
                >
                  {item.author}
                </div>
                <div
                  className="float-right"
                  style={{
                    color: item.status === "Approved" ? "#929292" : "white",
                  }}
                >
                  {item.year}
                </div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default LoadLiterature;
