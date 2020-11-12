import React from "react";
import { GridLoader, ClipLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "none",
};

export const PageLoading = () => {
  return (
    <div
      style={{
        position: "absolute",
        height: "50vh",
        width: "90%",
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <GridLoader style={override} size={50} color={"#ee4622"} loading={true} />
    </div>
  );
};
export const ActionLoading = () => {
  return (
    <ClipLoader css={override} size={20} color={"#ffffff"} loading={true} />
  );
};
