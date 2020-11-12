import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AiFillCheckCircle } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { Button, Dropdown } from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import NavbarAdmin from "../../../components/NavbarAdmin/NavbarAdmin";
import { ActionLoading, PageLoading } from "../../../components/Loading";
import { urlAsset, API } from "../../../config/api";
import { userContext } from "../../../context/userContext";
import "./HomeAdmin.css";
const HomeAdmin = () => {
  const [state] = useContext(userContext);
  const [cancelId, setCancelId] = useState(null);
  const [approveId, setApproveId] = useState(null);
  const [resetId, setResetId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [selected, setSelected] = useState("All");
  const [loading, setLoading] = useState(false);
  const {
    isLoading,
    error,
    data: literature,
    refetch,
  } = useQuery("loadLiterature", () => API.get(`/literature`));

  const [reset] = useMutation(async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({ status: "Waiting to be verified" });
      const res = await API.patch(`/literature/${resetId}`, body, config);

      await refetch();
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  });

  const [Cancel] = useMutation(async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({ status: "Cancel" });
      const res = await API.patch(`/literature/${cancelId}`, body, config);

      await refetch();
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  });
  const [Approve] = useMutation(async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({ status: "Approved" });
      const res = await API.patch(`/literature/${approveId}`, body, config);

      await refetch();
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  });
  const [onDelete] = useMutation(async () => {
    try {
      setLoading(true);
      const res = await API.delete(`/literature/${deleteId}`);
      await refetch();
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  });
  const history = useHistory();
  if (!state.isLoginAdmin) {
    history.push(`/`);
  }
  return (
    <div className="body" id="HomeAdmin" style={{ backgroundColor: "#161616" }}>
      <NavbarAdmin />
      <main>
        <p>Literature Verification</p>
        {isLoading || !literature ? (
          <PageLoading />
        ) : error ? (
          <h1>{error}</h1>
        ) : (
          <div>
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
                {selected}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="All" as={Button}>
                  All
                </Dropdown.Item>
                <Dropdown.Item eventKey="Approved" as={Button}>
                  Approved
                </Dropdown.Item>
                <Dropdown.Item eventKey="Cancel" as={Button}>
                  Cancel
                </Dropdown.Item>
                <Dropdown.Item eventKey="Waiting to be verified" as={Button}>
                  Waiting to be verified
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <table
              className="table"
              style={{
                color: "white",
                marginBottom: "300px",
                marginTop: "31px",
              }}
            >
              <tr>
                <th>No</th>
                <th>User or Author</th>
                <th>ISBN</th>
                <th>File</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
              <tbody>
                {literature.data.data.loadLiterature
                  .sort((a, b) => a.id - b.id)
                  .reverse()
                  .map((item, index) => {
                    if (selected === "All") {
                      return (
                        <tr>
                          <th>{item.id}</th>
                          <td>{item.author}</td>
                          <td>{item.ISBN}</td>
                          <td>{item.file}</td>
                          <td
                            style={{
                              color:
                                item.status === "Approved"
                                  ? "#0ACF83"
                                  : item.status === "Cancel"
                                  ? "#FF0742"
                                  : "#F7941E",
                            }}
                          >
                            {item.status}
                          </td>
                          <td>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              {item.status === "Approved" ? (
                                <div>
                                  <AiFillCheckCircle
                                    size={40}
                                    color="#3BB54A"
                                  />
                                  <Button
                                    variant="warning"
                                    onClick={() => {
                                      setResetId(item.id);
                                      reset();
                                    }}
                                    style={{
                                      background: "##ffcc00",
                                      color: "white",
                                      textAlign: "center",
                                      padding: "7px 22px 6px 21px",
                                      marginLeft: "50px",
                                    }}
                                  >
                                    {loading && resetId === item.id ? (
                                      <ActionLoading />
                                    ) : (
                                      "Reset"
                                    )}
                                  </Button>
                                </div>
                              ) : item.status === "Cancel" ? (
                                <div>
                                  <MdCancel size={40} color="#FF0742" />
                                  <Button
                                    variant="warning"
                                    onClick={() => {
                                      setResetId(item.id);
                                      reset();
                                    }}
                                    style={{
                                      background: "##ffcc00",
                                      color: "white",
                                      textAlign: "center",
                                      padding: "7px 22px 6px 21px",
                                      marginLeft: "50px",
                                    }}
                                  >
                                    {loading && resetId === item.id ? (
                                      <ActionLoading />
                                    ) : (
                                      "Reset"
                                    )}
                                  </Button>
                                </div>
                              ) : (
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    marginLeft: "-20px",
                                  }}
                                >
                                  <Button
                                    variant="none"
                                    onClick={() => {
                                      setCancelId(item.id);
                                      Cancel();
                                    }}
                                    style={{
                                      background: "#FF0742",
                                      color: "white",
                                      textAlign: "center",
                                      padding: "7px 22px 6px 21px",
                                    }}
                                  >
                                    {loading && cancelId === item.id ? (
                                      <ActionLoading />
                                    ) : (
                                      "Cancel"
                                    )}
                                  </Button>
                                  <div style={{ marginLeft: "22px" }}>
                                    <Button
                                      variant="none"
                                      style={{
                                        background: "#0ACF83",
                                        color: "white",
                                        textAlign: "center",
                                        padding: "7px 12px 6px 13px",
                                      }}
                                      onClick={() => {
                                        setApproveId(item.id);
                                        Approve();
                                      }}
                                    >
                                      {loading && approveId === item.id ? (
                                        <ActionLoading />
                                      ) : (
                                        "Approve"
                                      )}
                                    </Button>
                                  </div>
                                </div>
                              )}
                              <Button
                                variant="none"
                                onClick={() => {
                                  setDeleteId(item.id);
                                  onDelete();
                                }}
                                style={{
                                  background: "#FF0742",
                                  color: "white",
                                  padding: "7px 22px 6px 21px",
                                  marginLeft: "30px",
                                }}
                              >
                                {loading && deleteId === item.id ? (
                                  <ActionLoading />
                                ) : (
                                  <FaTrash />
                                )}
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    } else if (item.status === selected) {
                      return (
                        <tr>
                          <th>{index + 1}</th>
                          <td>{item.author}</td>
                          <td>{item.ISBN}</td>
                          <td>{item.file}</td>
                          <td
                            style={{
                              color:
                                item.status === "Approved"
                                  ? "#0ACF83"
                                  : item.status === "Cancel"
                                  ? "#FF0742"
                                  : "#F7941E",
                            }}
                          >
                            {item.status}
                          </td>
                          <td>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              {item.status === "Approved" ? (
                                <div>
                                  <AiFillCheckCircle
                                    size={40}
                                    color="#3BB54A"
                                  />
                                  <Button
                                    variant="warning"
                                    onClick={() => {
                                      setResetId(item.id);
                                      reset();
                                    }}
                                    style={{
                                      background: "##ffcc00",
                                      color: "white",
                                      textAlign: "center",
                                      padding: "7px 22px 6px 21px",
                                      marginLeft: "50px",
                                    }}
                                  >
                                    {loading && resetId === item.id ? (
                                      <ActionLoading />
                                    ) : (
                                      "Reset"
                                    )}
                                  </Button>
                                </div>
                              ) : item.status === "Cancel" ? (
                                <div>
                                  <MdCancel size={40} color="#FF0742" />
                                  <Button
                                    variant="warning"
                                    onClick={() => {
                                      setResetId(item.id);
                                      reset();
                                    }}
                                    style={{
                                      background: "##ffcc00",
                                      color: "white",
                                      textAlign: "center",
                                      padding: "7px 22px 6px 21px",
                                      marginLeft: "50px",
                                    }}
                                  >
                                    {loading && resetId === item.id ? (
                                      <ActionLoading />
                                    ) : (
                                      "Reset"
                                    )}
                                  </Button>
                                </div>
                              ) : (
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    marginLeft: "-20px",
                                  }}
                                >
                                  <Button
                                    variant="none"
                                    onClick={() => {
                                      setCancelId(item.id);
                                      Cancel();
                                    }}
                                    style={{
                                      background: "#FF0742",
                                      color: "white",
                                      textAlign: "center",
                                      padding: "7px 22px 6px 21px",
                                    }}
                                  >
                                    {loading && cancelId === item.id ? (
                                      <ActionLoading />
                                    ) : (
                                      "Cancel"
                                    )}
                                  </Button>
                                  <div style={{ marginLeft: "22px" }}>
                                    <Button
                                      variant="none"
                                      style={{
                                        background: "#0ACF83",
                                        color: "white",
                                        textAlign: "center",
                                        padding: "7px 12px 6px 13px",
                                      }}
                                      onClick={() => {
                                        setApproveId(item.id);
                                        Approve();
                                      }}
                                    >
                                      {loading && approveId === item.id ? (
                                        <ActionLoading />
                                      ) : (
                                        "Approve"
                                      )}
                                    </Button>
                                  </div>
                                </div>
                              )}
                              <Button
                                variant="none"
                                onClick={() => {
                                  setDeleteId(item.id);
                                  onDelete();
                                }}
                                style={{
                                  background: "#FF0742",
                                  color: "white",
                                  padding: "7px 22px 6px 21px",
                                  marginLeft: "30px",
                                }}
                              >
                                {loading && deleteId === item.id ? (
                                  <ActionLoading />
                                ) : (
                                  <FaTrash />
                                )}
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  })}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default HomeAdmin;
