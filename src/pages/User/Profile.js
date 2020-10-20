import React, { useContext } from 'react'
import { Context } from '../../context/Context';
import { Col,Button } from "react-bootstrap";
import Profile_addPP from "../../components/Profile_addPP";
import LoadLiterature from "../../components/LoadLiterature";
import BG from "../../asset/BG_Profile.png";

import { MdEmail,MdPlace } from "react-icons/md";
import { FaTransgender, FaPhoneAlt } from "react-icons/fa";

import "../../App.css";
const Profile = () => {
    const [state,dispatch] = useContext(Context)  
    const [modalShow, setModalShow] = React.useState(false);
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
                Profile
            </div>
            <div className="row" 
                style={{
                    backgroundImage:"url("+ BG +")",
                    backgroundRepeat: "no-repeat",
                }}>
                <div className="col-5" style={{paddingTop:"37px"}}>
                    <Col>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <Col xs={1} style={{color:"#AF2E1C"}}>
                                <MdEmail size={30} />
                            </Col>
                            <Col xs={11} style={{ marginLeft: "15px",marginTop:"-10px" }}>
                                <div className="DataUser">{state.user.email}</div>
                                <div className="DetailDataUser">Email</div>
                            </Col>
                        </div>
                    </Col>
                    <Col style={{marginTop:"35px"}}>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <Col xs={1} style={{color:"#AF2E1C"}}>
                                <FaTransgender size={30} />
                            </Col>
                            <Col xs={11} style={{ marginLeft: "15px",marginTop:"-10px" }}>
                                <div className="DataUser">{state.user.gender}</div>
                                <div className="DetailDataUser">gender</div>
                            </Col>
                        </div>
                    </Col>
                    <Col style={{marginTop:"35px"}}>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <Col xs={1} style={{color:"#AF2E1C"}}>
                                <FaPhoneAlt size={30} />
                            </Col>
                            <Col xs={11} style={{ marginLeft: "15px",marginTop:"-10px" }}>
                                <div className="DataUser">{state.user.phone}</div>
                                <div className="DetailDataUser">Phone</div>
                            </Col>
                        </div>
                    </Col>
                    <Col style={{marginTop:"35px"}}>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <Col xs={1} style={{color:"#AF2E1C"}}>
                                <MdPlace size={30} />
                            </Col>
                            <Col xs={11} style={{ marginLeft: "15px",marginTop:"-10px" }}>
                                <div className="DataUser">{state.user.address}</div>
                                <div className="DetailDataUser">Address</div>
                            </Col>
                        </div>
                    </Col>
                </div>
                <div className="col-7">
                    <div
                        style={{
                            marginTop: "41px",
                            marginRight: "26px",
                            marginLeft: "300px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                        >
                        <div style={{display:"flex",flexDirection:"column",alignContent:"center"}}>
                            <Col>
                                <img
                                    className="mx-auto d-block"
                                    src={ state.user.avatar === null
                                    ? require("../../asset/default.png")
                                    : require(`../../../../server/public/avatars/${state.user.avatar}`)
                                    }
                                    alt="avatar"
                                    style={{width: 180,borderRadius:"3px"}}
                                />
                            </Col>
                            <div style={{ paddingTop: "20px" }}>
                                <Button
                                    variant="none"                 
                                    style={{
                                        font: "avenir",
                                        fontSize: "18px",
                                        cursor: "pointer",
                                        background: "#EE4622",
                                        color: "white",
                                        borderRadius: "3px",
                                        fontWeight: "lighter",
                                        width: "227px",
                                        height: "50px",
                                        textAlign: "center",
                                        alignItems: "center",
                                        paddingTop: "10px",
                                    }}
                                    onClick={()=>setModalShow(true)}
                                    >
                                    Change Photo Profile
                                </Button>
                                <Profile_addPP
                                    show={modalShow}
                                    onHide={() => setModalShow(false)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{display:"flex", flexDirection:"column"}}>
                <div
                    style={{
                        fontFamily: "times news roman",
                        paddingTop: "80px",
                        marginBottom: "41px",
                        fontSize: "36px",
                        fontWeight: "bold",                        
                    }}
                    >
                        My Literature
                </div>
                    <LoadLiterature
                        route="PROFILE"
                    />
            </div>
        </div>
    )
}

export default Profile
