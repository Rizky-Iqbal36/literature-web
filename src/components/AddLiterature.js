import React, { useContext, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";
import { API } from "../config/api";
import { userContext } from "../context/userContext";
import Attach from "../asset/Attach.png";
import AlertModal from "./AlertModal";
import { PageLoading } from "./Loading";
const AddLiterature = () => {
  const [state] = useContext(userContext);
  const [showAlert, setShowAlert] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [when, setWhen] = useState("");
  const [loading, setLoading] = useState(false);
  //var getYear = parseInt(when.substring(0,4));
  let getYear = 0;
  let Month = 0;
  if (when) {
    getYear = parseInt(when.substr(0, 4));
    Month = parseInt(when.substr(5, 2));
  }
  let getMonth = "";
  [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ].map((month, index) => {
    if (index + 1 === Month) {
      getMonth = month;
    }
  });

  const SUPPORTED_FORMATS_IMAGE = ["image/jpg", "image/jpeg", "image/png"];
  const SUPPORTED_FORMATS_FILE = ["application/pdf"];

  const {
    handleSubmit,
    getFieldProps,
    errors,
    touched,
    values,
    resetForm,
    setFieldValue,
  } = useFormik({
    initialValues: {
      uploadBy: state.user?.id,
      title: "",
      publication: "",
      pages: "",
      ISBN: "",
      author: "",
      file: "",
      thumbnail: "",
      status: state.user?.isAdmin ? "Approved" : "Waiting to be verified",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Tittle is required field").min(3),
      publication: Yup.string().required("Publication date is required field"),
      pages: Yup.number().required("Pages is required field"),
      ISBN: Yup.string().required("ISBN is required field"),
      author: Yup.string().required("Author is required field"),
      thumbnail: Yup.mixed()
        .required("Thumbnail is required field")
        .test(
          "fileFormat",
          "Sorry only accept image filetype",
          (value) => value && SUPPORTED_FORMATS_IMAGE.includes(value.type)
        ),
      file: Yup.mixed()
        .required("File is required field")
        .test(
          "fileFormat",
          "Sorry only accept pdf filetype",
          (value) => value && SUPPORTED_FORMATS_FILE.includes(value.type)
        ),
    }),
    onSubmit: (values) => {
      console.log(values);

      storeLiterature(values);
      if (errorMsg === "") {
        resetForm({ values: "" });
      } else {
        return null;
      }
    },
  });

  const [storeLiterature, { isLoading, error }] = useMutation(
    async (values) => {
      try {
        setLoading(true);
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
        const formData = new FormData();
        formData.append("uploadBy", values.uploadBy);
        formData.append("title", values.title);
        formData.append("publication", values.publication);
        formData.append("pages", values.pages);
        formData.append("ISBN", values.ISBN);
        formData.append("author", values.author);
        formData.append("file", values.file);
        formData.append("thumbnail", values.thumbnail);
        formData.append("status", values.status);
        formData.append("year", getYear);
        formData.append("month", getMonth);

        console.log(formData);

        const res = await API.post("/literature", formData, config);

        setShowAlert(true);
        setLoading(false);
      } catch (err) {
        console.log(err.response.data.message);
        setErrorMsg(err.response.data.message);
        setLoading(false);
      }
    }
  );
  return loading ? (
    <PageLoading />
  ) : (
    <div>
      {errorMsg ? (
        <Alert variant="danger" style={{ width: "105%" }}>
          {errorMsg || error}
        </Alert>
      ) : null}
      <Form onSubmit={handleSubmit}>
        <Form.Group id="first-form">
          <Form.Control
            type="text"
            placeholder="Title"
            name="title"
            {...getFieldProps("title")}
          />
          <Form.Text className="text-muted">
            {touched.title && errors.title ? (
              <small style={{ color: "red" }}>{errors.title}</small>
            ) : null}
          </Form.Text>
        </Form.Group>
        <Form.Group onChange={(e) => setWhen(e.target.value)}>
          <Form.Control
            type="date"
            placeholder="Publication Date"
            name="publication"
            {...getFieldProps("publication")}
          />
          <Form.Text className="text-muted">
            {touched.publication && errors.publication ? (
              <small style={{ color: "red" }}>{errors.publication}</small>
            ) : null}
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="number"
            placeholder="Pages"
            name="pages"
            {...getFieldProps("pages")}
          />
          <Form.Text className="text-muted">
            {touched.pages && errors.pages ? (
              <small style={{ color: "red" }}>{errors.pages}</small>
            ) : null}
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="ISBN"
            name="ISBN"
            {...getFieldProps("ISBN")}
          />
          <Form.Text className="text-muted">
            {touched.ISBN && errors.ISBN ? (
              <small style={{ color: "red" }}>{errors.ISBN}</small>
            ) : null}
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Author"
            name="author"
            {...getFieldProps("author")}
          />
          <Form.Text className="text-muted">
            {touched.author && errors.author ? (
              <small style={{ color: "red" }}>{errors.author}</small>
            ) : null}
          </Form.Text>
        </Form.Group>
        <div className="form-group">
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              onChange={(e) => {
                setFieldValue("thumbnail", e.target.files[0]);
              }}
              id="thumbnail"
            />
            <label
              for="thumbnail"
              style={{
                borderColor: "grey",
                borderStyle: "solid",
                borderRadius: "5px",
                borderWidth: "thin",
                borderColor: "#D2D2D2",
                cursor: "pointer",
              }}
            >
              {values.thumbnail.name
                ? values.thumbnail.name
                : "Attache Book Thumbnail"}
              <img src={Attach} alt="Attach" />
            </label>
            <span className="help-block text-danger">
              {touched.thumbnail ? errors.thumbnail : ""}
            </span>
          </div>
        </div>
        <div className="form-group">
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              onChange={(e) => {
                setFieldValue("file", e.target.files[0]);
              }}
              id="file"
            />
            <label
              for="file"
              style={{
                borderColor: "grey",
                borderStyle: "solid",
                borderRadius: "5px",
                borderWidth: "thin",
                borderColor: "#D2D2D2",
                cursor: "pointer",
              }}
            >
              {values.file.name ? values.file.name : " Attach Literature file"}
              <img src={Attach} alt="attach" />
            </label>
            <span className="help-block text-danger">
              {touched.file ? errors.file : ""}
            </span>
          </div>
        </div>
        <div
          className="float-right"
          style={{
            paddingTop: "68px",
            paddingBottom: "31px",
          }}
        >
          <Button
            variant="none"
            type="submit"
            style={{
              backgroundColor: "#ee4622",
              color: "white",
              font: "avenir",
            }}
          >
            Add Literature
          </Button>
        </div>
      </Form>
      <AlertModal show={showAlert} onHide={() => setShowAlert(false)}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p>Your literature has been successfully carried out</p>
          <p>please wait 1 x 24 hours to verify this literature</p>
        </div>
      </AlertModal>
    </div>
  );
};

export default AddLiterature;
