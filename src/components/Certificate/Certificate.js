import React, { Component } from "react";

import { connect } from "react-redux";
import {
  saveCertificate,
  fetchCertificate,
  updateCertificate,
} from "../../services/index";

import { Card, Form, Button, Col, InputGroup, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSave,
  faPlusSquare,
  faUndo,
  faList,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import MyToast from "../MyToast";
import tagList from "../Tag/TagList";

class Certificate extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.state = {
      genres: [],
      languages: [],
      show: false,
    };
  }

  initialState = {
    id: "",
    name: "",
    description: "",
    duration: "",
    isbnNumber: "",
    price: "",
    language: "",
    genre: "",
    tagList1: "",
  };

  componentDidMount() {
    const certificateId = +this.props.match.params.id;
    if (certificateId) {
      this.findCertificateById(certificateId);
    }
  }


  findCertificateById = (certificateId) => {
    this.props.fetchCertificate(certificateId);
    setTimeout(() => {
      let certificate = this.props.bookObject.book;
      if (certificate != null) {

        console.log("LLLL");
        console.log(certificate)
        console.log("OOOO")
        console.log(certificate.tagList[0].name)

        let nameTag= "";
        for (let i = 0; i < certificate.tagList.length; i++) {
          nameTag = nameTag+" "+ certificate.tagList[i].name;
        }
        console.log(nameTag)


        this.setState({
          id: certificate.id,
          name: certificate.name,
          description: certificate.description,
          duration: certificate.duration,
          isbnNumber: certificate.isbnNumber,
          price: certificate.price,
          language: certificate.language,
          genre: certificate.genre,
          tagList1: nameTag,
        });


      }
    }, 1000);
  };

  resetCertificate = () => {
    this.setState(() => this.initialState);
  };

  submitCertificate = (event) => {
    event.preventDefault();



    const certificate = {
      name: this.state.name,
      description: this.state.description,
      duration: this.state.duration,
      isbnNumber: this.state.isbnNumber,
      price: this.state.price,
      tagList1: this.state.tagList1,
    };



    console.log(certificate)
    this.props.saveCertificate(certificate);
    setTimeout(() => {
      if (this.props.bookObject.book != null) {
        this.setState({ show: true, method: "post" });
        setTimeout(() => this.setState({ show: false }), 3000);
      } else {
        this.setState({ show: false });
      }
    }, 2000);
    this.setState(this.initialState);
  };

  updateCertificate = (event) => {
    event.preventDefault();

    const certificate = {
      id: this.state.id,
      name: this.state.name,
      description: this.state.description,
      duration: this.state.duration,
      price: this.state.price,
      language: this.state.language,
      genre: this.state.genre,
      tagList1: this.state.tagList1,
    };
    this.props.updateCertificate(certificate);
    setTimeout(() => {
      if (this.props.bookObject.book != null) {
        this.setState({ show: true, method: "put" });
        setTimeout(() => this.setState({ show: false }), 3000);
      } else {
        this.setState({ show: false });
      }
    }, 2000);
    this.setState(this.initialState);
  };

  certificateChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  certificateList = () => {
    return this.props.history.push("/list");
  };

  render() {
    const { name, description, duration,  price, tagList1 } =
      this.state;
   

    return (
      <div>
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <MyToast
            show={this.state.show}
            message={
              this.state.method === "put"
                ? "Certificate Updated Successfully."
                : "Certificate Saved Successfully."
            }
            type={"success"}
          />
        </div>
        <Card className={"border border-dark bg-dark text-white"}>
          <Card.Header>
            <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} />{" "}
            {this.state.id ? "Update Certificate" : "Add New Certificate"}
          </Card.Header>
          <Form
            onReset={this.resetCertificate}
            onSubmit={this.state.id ? this.updateCertificate : this.submitCertificate}
            id="bookFormId"
          >
            <Card.Body>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridTitle">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="test"
                    name="name"
                    value={name}
                    onChange={this.certificateChange}
                    className={"bg-dark text-white"}
                    placeholder="Enter Certificate Title"
                  />
                </Form.Group>


                <Form.Group as={Col} controlId="formGridAuthor">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="test"
                    name="description"
                    value={description}
                    onChange={this.certificateChange}
                    className={"bg-dark text-white"}
                    placeholder="Enter Certificate Author"
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridPrice">
                  <Form.Label>duration</Form.Label>
                  <Form.Control
                      required
                      autoComplete="off"
                      type="test"
                      name="duration"
                      value={duration}
                      onChange={this.certificateChange}
                      className={"bg-dark text-white"}
                      placeholder="Enter Certificate Price"
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>

              <Form.Group as={Col} controlId="formGridPrice">
                <Form.Label>Tags</Form.Label>
                <Form.Control
                    required
                    autoComplete="off"
                    type="test"
                    name="tagList1"
                    value={tagList1}
                    onChange={this.certificateChange}
                    className={"bg-dark text-white"}
                    placeholder="Enter Tag "
                />
              </Form.Group>

            </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridPrice">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="test"
                    name="price"
                    value={price}
                    onChange={this.certificateChange}
                    className={"bg-dark text-white"}
                    placeholder="Enter Certificate Price"
                  />
                </Form.Group>

              </Form.Row>
            </Card.Body>
            <Card.Footer style={{ textAlign: "right" }}>
              <Button size="sm" variant="success" type="submit">
                <FontAwesomeIcon icon={faSave} />{" "}
                {this.state.id ? "Update" : "Save"}
              </Button>{" "}
              <Button size="sm" variant="info" type="reset">
                <FontAwesomeIcon icon={faUndo} /> Reset
              </Button>{" "}
              <Button
                size="sm"
                variant="info"
                type="button"
                onClick={() => this.certificateList()}
              >
                <FontAwesomeIcon icon={faList} /> Certificate List
              </Button>
            </Card.Footer>
          </Form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    bookObject: state.book,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveCertificate: (certificate) => dispatch(saveCertificate(certificate)),
    fetchCertificate: (certificateId) => dispatch(fetchCertificate(certificateId)),
    updateCertificate: (certificate) => dispatch(updateCertificate(certificate)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Certificate);
