import React from "react";
import NavbarAdmin from "../../../components/NavbarAdmin/NavbarAdmin";
import AddLiterature from "../../../components/AddLiterature";
import "./AdminAddLiterature.css";
const AdminAddLiterature = () => {
  return (
    <div
      className="body"
      id="AdminAddLiterature"
      style={{ backgroundColor: "#161616" }}
    >
      <NavbarAdmin />
      <main>
        <p>Admin Add Literature</p>
        <AddLiterature />
      </main>
    </div>
  );
};

export default AdminAddLiterature;
