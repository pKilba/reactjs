import React, { Component } from "react";

import { connect } from "react-redux";
import {addCertificate, deleteCertificate} from "../../services/index";

import "./../../assets/css/Style.css";
import {

  Card,
  Table,
  Image,
  ButtonGroup,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faEdit,
  faTrash,
  faStepBackward,
  faFastBackward,
  faStepForward,
  faFastForward,
  faSearch,
  faTimes, faAnchor, faAngleDown, faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import MyToast from "../MyToast";
import axios from "axios";
import certificate from "./Certificate";

class CertificateList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      certificates: [],
      search: "",
      currentPage: 1,
      certificatesPerPage: 5,
      sortDir: "asc",
    };
  }

  sortData = () => {
    setTimeout(() => {
      this.state.sortDir === "asc"
          ? this.setState({ sortDir: "desc" })
          : this.setState({ sortDir: "asc" });
      this.findAllCertificates(this.state.currentPage);
    }, 500);
  };

  componentDidMount() {
    this.findAllCertificates(this.state.currentPage);
  }

  findAllCertificates(currentPage) {

    if (currentPage<1){
      currentPage = 1;
    }
    axios
        .get(
            "http://localhost:8080/certificates" //+
            // "?page=" +
            // currentPage +
            // "&size=" +
            // this.state.certificatesPerPage +
            //"&sortBy=price&sortDir=" +
            //this.state.sortDir
        )
        .then((response) => response.data)
        .then((data) => {

          console.log("wwertre")
          console.log("wwertre")
          console.log("wwertre")

          console.log(data)

          this.setState({
            certificates: data,
            totalPages: data.length,
            totalElements: data.totalElements,
            currentPage: currentPage,

          });
        })
        .catch((error) => {
          console.log(error);
          localStorage.removeItem("jwtToken");
          this.props.history.push("/");
        });
  }

  addCertificate = (certificateId) => {
    this.props.addCertificate(certificateId);
    setTimeout(() => {
      if (this.props.bookObject != null) {
        this.setState({ show: true });
        setTimeout(() => this.setState({ show: false }), 3000);
        this.findAllCertificates(this.state.currentPage);
      } else {
        this.setState({ show: false });
      }
    }, 1000);
  };


  deleteCertificate = (certificateId) => {
    this.props.deleteCertificate(certificateId);
    setTimeout(() => {
      if (this.props.bookObject != null) {
        this.setState({ show: true });
        setTimeout(() => this.setState({ show: false }), 3000);
        this.findAllCertificates(this.state.currentPage);
      } else {
        this.setState({ show: false });
      }
    }, 1000);
  };

  changePage = (event) => {
    let targetPage = parseInt(event.target.value);
    if (this.state.search) {
      this.searchData(targetPage);
    } else {
      this.findAllCertificates(targetPage);
    }
    this.setState({
      [event.target.name]: targetPage,
    });
  };

  firstPage = () => {
    let firstPage = 1;
    if (this.state.currentPage > firstPage) {
      if (this.state.search) {
        this.searchData(firstPage);
      } else {
        this.findAllCertificates(firstPage);
      }
    }
  };

  prevPage = () => {


    let prevPage = this.state.currentPage-1;
    console.log("")

    console.log(prevPage)

    if (this.state.currentPage > prevPage) {
      if (this.state.search) {
        this.searchData( prevPage);
      } else {
        this.findAllCertificates( prevPage);
      }
    }
  };

  lastPage = () => {
    let condition = (Math.ceil(this.state.certificates && this.state.certificates.length / this.state.certificatesPerPage))
    console.log(this.state.certificates)
    console.log(condition)
    console.log("Вфвва")
    if (this.state.currentPage < condition) {
      if (this.state.search) {
        this.searchData(condition);
      } else {
        this.findAllCertificates(condition);
      }
    }
  };

  nextPage = () => {

    if (
        this.state.currentPage <
        Math.ceil(this.state.totalElements / this.state.certificatesPerPage)
    )

    {
      if (this.state.search) {
        this.searchData(this.state.currentPage + 1);
      } else {
        this.findAllCertificates(this.state.currentPage + 1);
      }

    }
    console.log("g-g-g")
    console.log(this.state.currentPage+1)
    this.setState({
      currentPage: this.state.currentPage + 1,
    });
  };

  searchChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  cancelSearch = () => {
    this.setState({ search: "" });
    this.findAllCertificates(this.state.currentPage);
  };

  searchData = (currentPage) => {
    currentPage -= 1;
    axios
        .get(
            //"http://localhost:8080/certificates/string/" +
            //this.state.search
"http://localhost:8080/certificates/string/"+this.state.search
        )
        .then((response) => response.data)
        .then((data) => {

          console.log(data)
          console.log("LL")
          console.log("LL")

          this.setState({
            certificates: data,
            totalPages: data.totalPages,
            totalElements: data.totalElements,
            currentPage: 1, //data.number + 1,
          });
        });
  };

  render() {
    const { certificates, currentPage, search,certificatesPerPage } = this.state;

    console.log("ahahahahaa")
    console.log("ahahahahaa")
    console.log("-0-0-")
    console.log(certificatesPerPage)
    console.log("ahahahahaa")
    const lastIndex = currentPage * certificatesPerPage;
    const firstIndex = lastIndex - certificatesPerPage;

    let currentUsers = certificates;
    if (currentUsers.length>1){
      currentUsers
          = certificates && certificates.slice(firstIndex, lastIndex);}

    console.log(currentUsers)
    console.log(Array.isArray(currentUsers))
    const totalPages = (Math.ceil(certificates && certificates.length / certificatesPerPage))
    console.log(totalPages)
    return (

        <div>
          <div style={{ display: this.state.show ? "block" : "none" }}>
            <MyToast
                show={this.state.show}
                message={"Successfully."}
                type={"danger"}
            />
          </div>
          <Card className={"border border-dark bg-dark text-white"}>
            <Card.Header>
              <div style={{ float: "left" }}>
                <FontAwesomeIcon icon={faList} /> Certificate List
              </div>
              <div style={{ float: "right" }}>
                <InputGroup size="sm">
                  <FormControl
                      placeholder="Search"
                      name="search"
                      value={search}
                      className={"info-border bg-dark text-white"}
                      onChange={this.searchChange}
                  />
                  <InputGroup.Append>
                    <Button
                        size="sm"
                        variant="outline-info"
                        type="button"
                        onClick={this.searchData}
                    >
                      <FontAwesomeIcon icon={faSearch} />
                    </Button>
                    <Button
                        size="sm"
                        variant="outline-danger"
                        type="button"
                        onClick={this.cancelSearch}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>
            </Card.Header>
            <Card.Body>
              <Table bordered hover striped variant="dark">
                <thead>
                <tr>
                  <th>name</th>
                  <th>description</th>
                  <th>duration</th>
                  <th onClick={this.sortData}>
                    Price{" "}
                    <div
                        className={
                          this.state.sortDir === "asc"
                              ? "arrow arrow-up"
                              : "arrow arrow-down"
                        }
                    >
                      {" "}
                    </div>
                  </th>
                  <th>create data</th>
                  <th>last update data</th>
                  <th>Actions</th>
                </tr>
                </thead>
                <tbody>


                {!Array.isArray(currentUsers) ? (
                    <tr >

                      <td>
                        {currentUsers.name}
                      </td>
                      <td>{currentUsers.description}</td>
                      <td>{currentUsers.duration}</td>
                      <td>{currentUsers.price}</td>

                      <td>
                        {currentUsers.createDate}
                        {console.log(currentUsers.createDate.slice(0,5))}</td>
                        {console.log("PPPPPPPPPPPPPPPP")}
                        {console.log("PPPPPPPPPPPPPPPP")}
                        {console.log("PPPPPPPPPPPPPPPP")}
                        {console.log("PPPPPPPPPPPPPPPP")}
                        {console.log("PPPPPPPPPPPPPPPP")}
                      <td>{currentUsers.lastUpdateDate}</td>
                      <td>
                        <ButtonGroup>
                          <Link
                              to={"edit/" + currentUsers.id}
                              className="btn btn-sm btn-outline-primary"
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </Link>{" "}
                          <Button
                              size="sm"
                              variant="outline-danger"
                              onClick={() => this.deleteCertificate(currentUsers.id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        </ButtonGroup>
                      </td>
                    </tr>

                ) : (
                    currentUsers.map((certificate,index) => (
                        <tr key={index}>
                          <td>
                            {certificate.name}
                          </td>
                          <td>{certificate.description}</td>
                          <td>{certificate.duration}</td>
                          <td>{certificate.price}</td>
                          <td>{certificate.createDate.slice(0,16)}</td>
                          <td>{certificate.lastUpdateDate.slice(0,16)}</td>
                          <td>

                            {localStorage.roles ==="ROLE_ADMIN" ?
                                <ButtonGroup>
                                  <Link
                                      to={"edit/" + certificate.id}
                                      className="btn btn-sm btn-outline-primary"
                                  >
                                    <FontAwesomeIcon icon={faEdit} />
                                  </Link>{" "}
                                  <Button
                                      size="sm"
                                      variant="outline-danger"
                                      onClick={() => this.deleteCertificate(certificate.id)}
                                  >
                                    <FontAwesomeIcon icon={faTrash} />
                                  </Button>
                                </ButtonGroup>

                                :

                                <ButtonGroup>
                                  <Button
                                      size="sm"
                                      variant="outline-danger"
                                      onClick={() => this.addCertificate(certificate.id)}
                                  >
                                    <FontAwesomeIcon icon={faCheck} />
                                  </Button>

                                </ButtonGroup>
                            }


                          </td>
                        </tr>
                    ))
                )}
                </tbody>
              </Table>
            </Card.Body>
            {certificates.length > 0 ? (
                <Card.Footer>
                  <div style={{ float: "left" }}>
                    Showing Page {currentPage} of {totalPages}
                  </div>
                  <div style={{ float: "right" }}>
                    <InputGroup size="sm">
                      <InputGroup.Prepend>
                        <Button
                            type="button"
                            variant="outline-info"
                            disabled={currentPage === 1 ? true : false}
                            onClick={this.firstPage}
                        >
                          <FontAwesomeIcon icon={faFastBackward} /> First
                        </Button>
                        <Button
                            type="button"
                            variant="outline-info"
                            disabled={currentPage === 1 ? true : false}
                            onClick={this.prevPage}
                        >
                          <FontAwesomeIcon icon={faStepBackward} /> Prev
                        </Button>
                      </InputGroup.Prepend>
                      <FormControl
                          className={"page-num bg-dark"}
                          name="currentPage"
                          value={currentPage}
                          onChange={this.changePage}
                      />
                      <InputGroup.Append>
                        <Button
                            type="button"
                            variant="outline-info"
                            disabled={currentPage === totalPages ? true : false}
                            onClick={this.nextPage}
                        >
                          <FontAwesomeIcon icon={faStepForward} /> Next
                        </Button>
                        <Button
                            type="button"
                            variant="outline-info"
                            disabled={currentPage === totalPages ? true : false}
                            onClick={this.lastPage}
                        >
                          <FontAwesomeIcon icon={faFastForward} /> Last
                        </Button>
                      </InputGroup.Append>
                    </InputGroup>
                  </div>
                </Card.Footer>
            ) : null}
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
    deleteCertificate: (certificateId) => dispatch(deleteCertificate(certificateId)),
    addCertificate:(certificateId) => dispatch(addCertificate(certificateId))

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CertificateList);

