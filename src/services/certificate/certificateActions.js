import * as BT from "./certificateTypes";
import axios from "axios";

export const saveCertificate = (book) => {
  return (dispatch) => {
    dispatch({
      type: BT.SAVE_BOOK_REQUEST,
    });
    axios
      .post("http://localhost:8080/certificates", book)
      .then((response) => {
        dispatch(bookSuccess(response.data));
      })
      .catch((error) => {
        dispatch(bookFailure(error));
      });
  };
};



export const fetchBooks = () => {
  return (dispatch) => {
    dispatch({
      type: BT.FETCH_BOOK_REQUEST,
    });
    axios
        .get("http://localhost:8080/certificates/")
        .then((response) => {
          console.log(response.data);
          dispatch(bookSuccess(response.data));
        })
        .catch((error) => {
          dispatch(bookFailure(error));
        });
  };
};


export const fetchCertificate = (bookId) => {
  return (dispatch) => {
    dispatch({
      type: BT.FETCH_BOOK_REQUEST,
    });
    axios
      .get("http://localhost:8080/certificates/" + bookId)
      .then((response) => {
        dispatch(bookSuccess(response.data));
      })
      .catch((error) => {
        dispatch(bookFailure(error));
      });
  };
};

export const updateCertificate = (book) => {
  console.log("zzzzZZZZZZZZZZ")
  return (dispatch) => {
    dispatch({
      type: BT.UPDATE_BOOK_REQUEST,
    });
    axios
        .patch("http://localhost:8080/certificates/update", book)
      .then((response) => {
        dispatch(bookSuccess(response.data));
      })
      .catch((error) => {
        dispatch(bookFailure(error));
      });
  };
};


export const deleteTag = (bookId) => {
  return (dispatch) => {
    dispatch({
      type: BT.DELETE_BOOK_REQUEST,
    });
    axios
        .delete("http://localhost:8080/tags/" + bookId)
        .then((response) => {
          dispatch(bookSuccess(response.data));
        })
        .catch((error) => {
          dispatch(bookFailure(error));
        });
  };
};

export const addCertificate = (book) => {

  console.log("first123")
  console.log("first123")
  console.log("first123")
  console.log(book)
  console.log("first123")


  return (dispatch) => {
    dispatch({
      type: BT.SAVE_BOOK_REQUEST,
    });
    axios
        .post("http://localhost:8080/orders",localStorage.Admin+"229"+ book)
        .then((response) => {
          dispatch(bookSuccess(response.data));
        })
        .catch((error) => {
          dispatch(bookFailure(error));
        });
  };
};




export const deleteCertificate = (bookId) => {
  return (dispatch) => {
    dispatch({
      type: BT.DELETE_BOOK_REQUEST,
    });
    axios
      .delete("http://localhost:8080/certificates/" + bookId)
      .then((response) => {
        dispatch(bookSuccess(response.data));
      })
      .catch((error) => {
        dispatch(bookFailure(error));
      });
  };
};

const bookSuccess = (book) => {
  return {
    type: BT.BOOK_SUCCESS,
    payload: book,
  };
};

const bookFailure = (error) => {
  return {
    type: BT.BOOK_FAILURE,
    payload: error,
  };
};

