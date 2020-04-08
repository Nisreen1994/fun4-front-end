import React, { Component } from "react";
import { ReactTable } from "react-table";
class Timesheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    const url = "https://jsonplaceholder.typicode.com/posts";
    fetch(url, { method: "GET" })
      .then(reponse => reponse.json())
      .then(posts => {
        this.setState({ posts: posts });
      });
  }
  render() {
    const columns = [
      {
        Header: "User ID",
        accessor: "userId"
      },
      {
        Header: "ID",
        accessor: "id"
      },
      {
        Header: "Title",
        accessor: "title"
      },
      {
        Header: "Content",
        accessor: "body"
      }
    ];
    return (
      <ReactTable
        columns={columns}
        defaultPageSize={2}
        pageSizeOptions={[2, 4, 6]}
        data={this.state.posts}
      ></ReactTable>
    );
  }
}

export default Timesheet;
