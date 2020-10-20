import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { API } from "../config/api";
const LoadLiterature = (props) => {
    const [literatures,setLiteratures] = useState([])
    const [loading,setLoading] = useState(true);
    const history = useHistory();
    useEffect(()=>{
        const loadLiterature = async ()=>{
            try {
                setLoading(true)
                if(props.route === "HOME"){
                    const res = await API.get("/literature");
                    setLiteratures(res.data.data.loadLiterature);
                }
                else if(props.route === "PROFILE"){
                    const res = await API.get("/literature");
                    setLiteratures(res.data.data.loadLiterature);
                }
                setLoading(false)
            } catch (err) {
                setLoading(false);
                console.log(err);
            }
        }
        loadLiterature();
    },[])
    console.log(literatures)
    return loading || !literatures ?(
        <h1>Loading...</h1>
    ):(
        <div>
            <div className="row" style={{color:"white"}}>
                {
                    props.route === "HOME"?(
                        literatures.map((item)=>{
                            return(   
                                <div
                                    className="col-md-3"
                                    onClick={() =>
                                    history.push(`/Detail/${item.id}`)
                                    }
                                    style={{
                                    cursor: "pointer",
                                    maxWidth: 200,
                                    marginTop: "82px",
                                    marginRight:"80px",
                                    borderRadius: "10px",
                                    backgroundColor:"blue",
                                    height:"379px"
                                    }}
                                >
                                    <div
                                    style={{
                                        fontFamily: "times news roman",
                                        fontWeight: "bold",
                                        fontSize: "24px",                            
                                    }}
                                    >
                                    {item.title}
                                    </div>
                                    <p
                                    style={{
                                        font: "avenir",
                                        fontSize: "18px",                            
                                    }}
                                    >
                                    {item.author}
                                    </p>
                                </div>                 
                            )
                        })
                    ):props.route === "PROFILE"?(
                        literatures.map((item, index)=>{
                            return(   
                                <div
                                    className="col-md-3"
                                    onClick={() =>
                                    history.push(`/Detail/${item.id}`)
                                    }
                                    style={{
                                        cursor: "pointer",
                                        maxWidth: 200,
                                        marginBottom: "82px",
                                        marginRight: "80px",
                                        borderRadius: "10px",
                                        backgroundColor:"blue",
                                        height:"379px"
                                    }}
                                >
                                    <div
                                    style={{
                                        fontFamily: "times news roman",
                                        fontWeight: "bold",
                                        fontSize: "24px",                            
                                    }}
                                    >
                                    {item.title}
                                    </div>
                                    <p
                                    style={{
                                        font: "avenir",
                                        fontSize: "18px",                            
                                    }}
                                    >
                                    {item.author}
                                    </p>
                                </div>                 
                            )
                        })
                    ):(
                        <h1> DARI MY COLLECTION</h1>
                    )
                }
            </div>
        </div>
    )
}

export default LoadLiterature
