import React from "react";
import NavbarUser from "../../../components/NavbarUser/NavbarUser";
import AddLiterature from "../../../components/AddLiterature";
import "./UserAddLiterature.css";
const UserAddLiterature = () => {
  return (
    <div
      className="body"
      id="UserAddLiterature"
      style={{ backgroundColor: "#161616", marginBottom: "25px" }}
    >
      <NavbarUser />
      <main>
        <p>Add Literature</p>
        <AddLiterature />
      </main>
    </div>
  );
};

export default UserAddLiterature;
