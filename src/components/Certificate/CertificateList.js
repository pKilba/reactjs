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
      books: [],
      search: "",
      currentPage: 1,
      booksPerPage: 5,
      sortDir: "asc",
    };
  }

  sortData = () => {
    setTimeout(() => {
      this.state.sortDir === "asc"
          ? this.setState({ sortDir: "desc" })
          : this.setState({ sortDir: "asc" });
      this.findAllBooks(this.state.currentPage);
    }, 500);
  };

  componentDidMount() {
    this.findAllBooks(this.state.currentPage);
  }

  findAllBooks(currentPage) {
    currentPage -= 1;
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
            books: data,
            totalPages: data.length,
            totalElements: data.totalElements,
            currentPage: 1,

          });
        })
        .catch((error) => {
          console.log(error);
          localStorage.removeItem("jwtToken");
          this.props.history.push("/");
        });
  }

  addCertificate = (bookId) => {
    this.props.addCertificate(bookId);
    setTimeout(() => {
      if (this.props.bookObject != null) {
        this.setState({ show: true });
        setTimeout(() => this.setState({ show: false }), 3000);
        this.findAllBooks(this.state.currentPage);
      } else {
        this.setState({ show: false });
      }
    }, 1000);
  };


  deleteBook = (bookId) => {
    this.props.deleteBook(bookId);
    setTimeout(() => {
      if (this.props.bookObject != null) {
        this.setState({ show: true });
        setTimeout(() => this.setState({ show: false }), 3000);
        this.findAllBooks(this.state.currentPage);
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
      this.findAllBooks(targetPage);
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
        this.findAllBooks(firstPage);
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
        this.findAllBooks( prevPage);
      }
    }
  };

  lastPage = () => {
    let condition = Math.ceil(
        this.state.totalElements / this.state.booksPerPage
    );
    if (this.state.currentPage < condition) {
      if (this.state.search) {
        this.searchData(condition);
      } else {
        this.findAllBooks(condition);
      }
    }
  };

  nextPage = () => {

    if (
        this.state.currentPage <
        Math.ceil(this.state.totalElements / this.state.booksPerPage)
    )

    {
      if (this.state.search) {
        this.searchData(this.state.currentPage + 1);
      } else {
        this.findAllBooks(this.state.currentPage + 1);
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
    this.findAllBooks(this.state.currentPage);
  };

  searchData = (currentPage) => {
    currentPage -= 1;
    axios
        .get(
            "http://localhost:8080/certificates/" +
            this.state.search +
            "?page=" +
            currentPage +
            "&size=" +
            this.state.booksPerPage
        )
        .then((response) => response.data)
        .then((data) => {

          console.log(data)
          console.log("LL")
          console.log("LL")

          this.setState({
            books: data,
            totalPages: data.totalPages,
            totalElements: data.totalElements,
            currentPage: 1, //data.number + 1,
          });
        });
  };

  render() {
    const { books, currentPage, search,booksPerPage } = this.state;

    console.log("ahahahahaa")
    console.log("ahahahahaa")
    console.log(books)
    console.log("-0-0-")
    console.log(search)
    console.log("ahahahahaa")
    const lastIndex = currentPage * booksPerPage;
    const firstIndex = lastIndex - booksPerPage;

    let currentUsers = books;
    if (currentUsers.length>1){
      currentUsers
          = books && books.slice(firstIndex, lastIndex);}

    console.log(currentUsers)
    console.log(Array.isArray(currentUsers))
    const totalPages = books && books.length / booksPerPage
    console.log(books.length)
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
                      <td>{currentUsers.createDate}</td>
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
                              onClick={() => this.deleteBook(currentUsers.id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        </ButtonGroup>
                      </td>
                    </tr>

                ) : (
                    currentUsers.map((book,index) => (
                        <tr key={index}>
                          <td>
                            {book.name}
                          </td>
                          <td>{book.description}</td>
                          <td>{book.duration}</td>
                          <td>{book.price}</td>
                          <td>{book.createDate}</td>
                          <td>{book.lastUpdateDate}</td>
                          <td>
                            {localStorage.Admin ==="1111" ?
                                <ButtonGroup>
                                  <Link
                                      to={"edit/" + book.id}
                                      className="btn btn-sm btn-outline-primary"
                                  >
                                    <FontAwesomeIcon icon={faEdit} />
                                  </Link>{" "}
                                  <Button
                                      size="sm"
                                      variant="outline-danger"
                                      onClick={() => this.deleteBook(book.id)}
                                  >
                                    <FontAwesomeIcon icon={faTrash} />
                                  </Button>
                                </ButtonGroup>

                                :

                                <ButtonGroup>
                                  <Button
                                      size="sm"
                                      variant="outline-danger"
                                      onClick={() => this.addCertificate(book.id)}
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
            {books.length > 0 ? (
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
    deleteBook: (bookId) => dispatch(deleteCertificate(bookId)),
    addCertificate:(bookId) => dispatch(addCertificate(bookId))

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CertificateList);

