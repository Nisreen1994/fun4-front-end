import React, { Component } from "react";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: [] };
  }
  componentDidMount() {
    const url = "http://localhost:8080/timesheet/3/data";
    fetch(url, { method: "GET" })
      .then((reponse) => reponse.json())
      .then((posts) => {
        this.setState({ posts: posts });
      });
  }
  deleteRow(id) {
    /* const index = this.state.posts.findIndex((posts) => {
      return posts.id === id;
    });
    console.log("index", index);    
    const variabl = this.state.posts[index].id;
    console.log("var", variabl);
    */
    var url = "https://jsonplaceholder.typicode.com/posts/" + id;
    console.log(url);
    fetch("https://jsonplaceholder.typicode.com/posts/" + id, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((posts) => {
        this.setState({ posts: posts });
        var idx = this.state.posts.findIndex((posts) => posts.id === id);
        posts.splice(idx, 1);
        this.setState({ posts: posts });
      })
      .catch((err) => console.error(err));
  }
  render() {
    const topHead = [
      {
        Header: "Hello",
      },
    ];
    const columns = [
      {
        Header: "Activity",
        accessor: "activity",
        style: {
          textAlign: "right",
        },
        width: 100,
        maxWidth: 100,
        minWidth: 100,
      },
      {
        Header: "Date",
        accessor: "date",
        width: 100,
        maxWidth: 100,
        minWidth: 100,
      },
      {
        Header: "Start-time",
        accessor: "startTime",
        sortable: false,
        filterable: false,
      },
      {
        Header: "End-time",
        accessor: "endTime",
        sortable: false,
        filterable: false,
      },
      {
        Header: "Description",
        accessor: "description",
        sortable: false,
        filterable: false,
      },
      {
        Header: "Actions",
        Cell: (props) => {
          return (
            <form>
              <button
                style={{
                  backgroundColor: "red",
                  color: "white",
                  marginRight: "10px",
                }}
                onClick={() => {
                  this.deleteRow(props.original.id);
                }}
              >
                Delete
              </button>

              <button
                style={{
                  backgroundColor: "yellow",
                  color: "white",
                  marginLeft: "10PX",
                }}
              >
                {" "}
                Edit
              </button>
            </form>
          );
        },
        sortable: false,
        filterable: false,
      },
    ];
    return (
      <div>
        <div>
          <h1>this a test</h1>
        </div>
        <div>
          <ReactTable
            columns={columns}
            data={this.state.posts}
            filterable
          ></ReactTable>
        </div>
      </div>
    );
  }
}

export default DataTable;
