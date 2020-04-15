import React, { Component } from "react";

export default class SearchForm extends Component {
  render() {
    return (
      <form className="search-form" onSubmit={this.props.handleSubmit}>
        <input
          type="search"
          value={this.props.searchText}
          onChange={this.props.onSearchChange}
          name="search"
          // ref={(input) => (this.query = input)}
          placeholder="Search..."
        />
      </form>
    );
  }
}
