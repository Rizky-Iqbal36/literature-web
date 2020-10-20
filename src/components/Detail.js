import React, { useState } from 'react'
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { API } from "../config/api";
import {BsCloudDownload} from "react-icons/bs";
const Detail = () => {
    const { id } = useParams();
    const { isLoading, error, data: literature, refetch } = useQuery(
        "getLiterature",
        () => API.get(`/literature/${id}`)        
    );
    
  return isLoading || !literature ? (
    <h1>Loading...</h1>
  ) : error ? (
    <h1>error {error.message} </h1>
  ) : (
      <div className="container" style={{color:"white", paddingBottom:"100px"}}>
        <div
            className="row"
            style={{
                fontFamily: "times news roman",
                fontSize: "36px",
                fontWeight: "bold",
                lineHeight: "101.5%",
                marginBottom: "39px",
            }}>
            DETAIL Literature dengan id : {id}
        </div>
    </div>        
    )
}

export default Detail
