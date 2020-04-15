import React, { Component } from "react";
import "./App.scss";
import axios from "axios";
import SearchForm from "./Components/SearchForm";
import RepoList from "./Components/RepoList";
import Pagination from "react-js-pagination";
import find from "./img/find.png";

class App extends Component {
  //initialize the initial state
  state = {
    repos: [],
    loading: false,
    arr: [],
    total_count: 0,
    activePage: 1,
    searchText: "",
  };

  performSearch = (query = "", page = 1) => {
    this.setState({ loading: true }); //the loader is started until the data arrives

    axios //using axios we get data from api githab and put it in state
      .get(
        `https://api.github.com/search/repositories?q=${query}&sort=stars&page=${page}&per_page=30` //We will use query to search by the name of the repository, and the page for pagination
      ) //sort=stars required to sort by rating
      .then((response) => {
        this.setState({
          query: query,
          repos: response.data.items,
          loading: false,
          total_count: response.data.total_count / 30, //number of pagination buttons depends on dividing total number of repositories by 30 (number on one page)
        });
      })
      .catch((error) => {
        console.log("Error fetching and parsing data", error);
      });
  };

  // the method responsible for recording the current input
  onSearchChange = (e) => {
    this.setState({ searchText: e.target.value });
  };

  //the function that does the request itself takes the value and transmits to the request then resets the page
  handleSubmit = (e) => {
    e.preventDefault();
    this.performSearch(this.state.searchText);
    this.setState({ activePage: 1 });
  };

  // function that works when pressing pagination and gives the number of the current button. Passes the button number and I pass it on request, update the status of pagination to other data with another page
  paginationChange = (pageNumber) => {
    this.performSearch(this.state.searchText, pageNumber);
    this.setState({ activePage: pageNumber });
  };

  //nullify the data
  resetForm = () => {
    this.setState({
      repos: [],
      loading: false,
      arr: [],
      total_count: 0,
      activePage: 1,
      searchText: "",
    });
  };

  render() {
    const { total_count, activePage } = this.state;
    return (
      <div className="wrapper">
        <div className="wrapperInside">
          <header className="header">
            <div className="inner">
              <SearchForm
                onSearch={this.performSearch}
                searchText={this.state.searchText}
                onSearchChange={this.onSearchChange}
                handleSubmit={this.handleSubmit}
              />
              <button className="find" onClick={this.handleSubmit}>
                <img src={find} alt="search" />
              </button>
            </div>
          </header>
          <main className="main">
            {this.state.loading ? (
              <p>Loading...</p>
            ) : (
              <div className="repoList">
                <h2>{this.state.query}</h2>
                <RepoList data={this.state.repos} />
              </div>
            )}
            <div className="CancAndPagin">
              <button onClick={this.resetForm}>Cancel</button>
              <Pagination
                activePage={activePage}
                itemsCountPerPage={30}
                totalItemsCount={total_count}
                pageRangeDisplayed={5}
                onChange={this.paginationChange}
              />
            </div>
          </main>
        </div>
      </div>
    );
  }
}
export default App;
