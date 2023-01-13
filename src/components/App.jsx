import { Component } from "react";
import { ToastContainer } from 'react-toastify';

import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Button from "components/Button/Button";

import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      picture: "",
      page: 1,
    }
  }

  handlerClick = () => {
        const newPage = this.state.page + 1
        this.setState({
            page: newPage
        })
    }

  formSubmitHandler = name => {
    this.setState({
      picture: name,
      page: 1
    })
  }

  render() {
    return (
      <div
        style={{
          // minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white'
        }}
      >
        <Searchbar onSubmit={this.formSubmitHandler} />
        <ImageGallery
          picture={this.state.picture}
          page={this.state.page}
          children={<Button onClick={this.handlerClick} />}
        />
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    );
  }
};

export default App;