import { Component } from "react";
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { Blocks } from 'react-loader-spinner'

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
      pictureArray: [],
      loading: false
    }
  }
// ----------------------
// ----------------------
componentDidMount() {
  this.setState({ loading: true })
  this.fetchParams(this.state.picture, this.state.page);
  }

shouldComponentUpdate(nextProps, nextState) {
  if (this.state.picture !== nextState.picture) {
    this.setState({ loading: true })
    this.fetchParams(nextState.picture, nextState.page);
  } else if (this.state.page !== nextState.page) {
    this.setState({ loading: true })
    fetch(`https://pixabay.com/api/?key=31702044-2ea23ebf9858467e7c06f0c89&q=${nextState.picture}&page=${nextState.page}&per_page=12`)
      .then(res => res.json())
      .then(get => this.setState({pictureArray: [...nextState.pictureArray, ...get.hits]}))
      .finally(this.setState({loading: false}))
  }

  return true
}

  fetchParams(name, page) {
      fetch(`https://pixabay.com/api/?key=31702044-2ea23ebf9858467e7c06f0c89&q=${name}&page=${page}&per_page=12`)
        .then(res => res.json())
        .then(get => {
          if (get.hits.length === 0) {
            toast(`🦄Write normal name`)
            this.setState({ pictureArray: [] })
          }
          this.setState({ pictureArray: [...get.hits] })
        })
        .finally(this.setState({loading: false}))
  }
  
  handlerClick = () => {
    this.setState(prevState => ({page: prevState.page + 1}))
  }

  formSubmitHandler = name => {
    this.setState({
      picture: name,
      page: 1
    })
  }

  render() {
    const { picture, page, pictureArray, loading } = this.state
    
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white'
        }}
      >
        <Searchbar onSubmit={this.formSubmitHandler} />
        {this.state.loading ?
          <Blocks /> : 
          <ImageGallery
            loading={loading}
            picture={picture}
            page={page}
            pictureArray={pictureArray}
            children={<Button onClick={this.handlerClick} />}
          />  
        }
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