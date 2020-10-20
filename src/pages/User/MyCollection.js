import React from 'react'
import LoadLiterature from "../../components/LoadLiterature";
const MyCollection = () => {
    return (
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
                My Collection
            </div>
            <div className="row">
                <LoadLiterature 
                    route="COLLECTION"
                />
            </div>
        </div>
    )
}

export default MyCollection
