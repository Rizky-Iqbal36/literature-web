import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { API } from "../config/api";
import { Context } from "../context/Context";
import { urlAsset } from "../config/api";
import { Alert } from "react-bootstrap";
import { AiFillWarning } from "react-icons/ai";
import { PageLoading } from "./Loading";
const LoadLiterature = (props) => {
  const [state, dispatch] = useContext(Context);
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
  return loading || !literatures ? (
    <PageLoading />
  ) : literatures.length === 0 ? (
    <div
      style={{
        marginTop: "80px",
        marginLeft: props.route === "PROFILE" ? "150px" : "72px",
        textAlign: "center",
        fontSize: "36px",
        font: "avenir",
      }}
    >
      <Alert variant="warning">
        {props.route === "PROFILE" ? (
          <p>
            <AiFillWarning style={{ marginTop: "-10px" }} />
            YOU DON'T HAVE ANY LITERATURE
          </p>
        ) : (
          <p>
            <AiFillWarning style={{ marginTop: "-10px" }} />
            THER IS NO LITERATURE IN HERE
          </p>
        )}
      </Alert>
    </div>
  ) : (
    <div>
      <div className="row" style={{ color: "white" }}>
        {props.route !== "PROFILE" ? (
          literatures.map((item, index) => {
            if (item.status === "Approved") {
              return (
                <div
                  className="col-md-3"
                  onClick={() => history.push(`/Detail/${item.id}`)}
                  style={{
                    cursor: "pointer",
                    maxWidth: 230,
                    marginTop: "85px",
                    borderRadius: "10px",
                  }}
                >
                  <div className="container-fluid">
                    <img
                      src={urlAsset.photo + item.thumbnail}
                      className="responsive-img"
                      width="200"
                      height="270"
                      style={{
                        borderRadius: "10px",
                        marginLeft: "-15px",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      fontFamily: "times news roman",
                      fontWeight: "bold",
                      fontSize: "24px",
                      marginTop: "18px",
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    style={{
                      paddingTop: "15px",
                      font: "avenir",
                      color: "#929292",
                    }}
                  >
                    <div className="float-left">
                      <p
                        style={{
                          font: "avenir",
                          fontSize: "18px",
                          opacity: "1",
                        }}
                      >
                        {item.author}
                      </p>
                    </div>
                    <div className="float-right">{item.year}</div>
                  </div>
                </div>
              );
            }
          })
        ) : founded !== undefined ? (
          literatures.map((item) => {
            if (item.uploadBy === state.user.id) {
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
                    maxWidth: 230,
                    marginRight: "40px",
                    paddingTop: "15px",
                    borderRadius: "10px",
                  }}
                >
                  <div className="container-fluid">
                    <img
                      src={urlAsset.photo + item.thumbnail}
                      className="responsive-img"
                      width="200"
                      height="270"
                      style={{
                        marginLeft: "-15px",
                        opacity: item.status === "Approved" ? "1" : "0.5",
                        borderRadius: "10px",
                      }}
                    />
                    {item.status === "Cancel" ? (
                      <div
                        style={{
                          color: "red",
                          position: "absolute",
                          top: "50%",
                          font: "avenir",
                          fontSize: "18px",
                          fontWeight: "800",
                          marginLeft: "-30px",
                          backgroundColor: "#6290c8",
                          width: "100%",
                          textAlign: "center",
                        }}
                      >
                        literature Canceled
                      </div>
                    ) : item.status === "Waiting to be verified" ? (
                      <div
                        style={{
                          color: "#FFD600",
                          position: "absolute",
                          marginLeft: "-30px",
                          top: "50%",
                          font: "avenir",
                          fontSize: "18px",
                          fontWeight: "800",
                          backgroundColor: "#6290c8",
                          textAlign: "center",
                          width: "100%",
                        }}
                      >
                        Waiting to be verified
                      </div>
                    ) : null}
                  </div>
                  <div
                    style={{
                      fontFamily: "times news roman",
                      fontWeight: "bold",
                      fontSize: "24px",
                      opacity: item.status === "Approved" ? "1" : "0.5",
                      paddingTop: "18px",
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    style={{
                      paddingTop: "15px",
                      font: "avenir",
                      color: item.status === "Approved" ? "#929292" : "white",
                      opacity: item.status === "Approved" ? "1" : "0.5",
                    }}
                  >
                    <div className="float-left">
                      <p
                        style={{
                          font: "avenir",
                          fontSize: "18px",
                        }}
                      >
                        {item.author}
                      </p>
                    </div>
                    <div className="float-right">{item.year}</div>
                  </div>
                </div>
              );
            }
          })
        ) : (
          <div
            style={{
              textAlign: "center",
              fontSize: "36px",
              font: "avenir",
              marginLeft: "270px",
            }}
          >
            <Alert variant="warning">
              <AiFillWarning style={{ marginTop: "-10px" }} />
              YOU DON'T HAVE ANY LITERATURE
            </Alert>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadLiterature;
