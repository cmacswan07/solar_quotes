import React from "react";
import { Link } from "react-router-dom";

// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  Table,
  Button,
  Badge,
  Pagination,
  PaginationItem,
  PaginationLink
} from "reactstrap";

import moment from 'moment';
import { sortRows } from 'Utils';

class ProjectsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      pageSize: 5,
      currentPage: 0,
      pageCount: 0,
      pageItems: [],
      pageRange: [],
      sortedBy: '',
      sortAsc: true
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.projects !== this.props.projects) {
      var pageCount = Math.ceil(this.props.projects.length / this.state.pageSize);
      var beginIndex = this.state.currentPage;
      var endIndex = this.state.currentPage + 5;
      this.setState({
        projects: this.props.projects,
        pageCount: pageCount,
        pageItems: this.props.projects.slice(0, 5),
        pageRange: Array.from(Array(pageCount).keys()).slice(beginIndex, endIndex)
      });
    }

    if (prevState.currentPage !== this.state.currentPage) {
      // Get new page of module rows.
      var beginRowIndex = this.state.currentPage * this.state.pageSize;
      var endRowIndex = beginRowIndex + this.state.pageSize;
      var newPageItems = this.state.projects.slice(beginRowIndex, endRowIndex);
      this.setState({
        pageItems: newPageItems
      });

      // Update the range of page #'s in pagination bar.
      if (this.state.currentPage < Math.floor(this.state.pageRange.length / 2) && this.state.pageRange[0] > 0) {
        var beginPageIndex = 0;
        var endPageIndex = this.state.currentPage + 4;
        this.setState({
          pageRange: Array.from(Array(this.state.pageCount).keys()).slice(beginPageIndex, endPageIndex)
        });
      }

      if (this.state.currentPage >= Math.floor(this.state.pageRange.length / 2) && this.state.currentPage < this.state.pageCount) {
        var beginPageIndex = this.state.currentPage - 2;
        if (beginPageIndex < 0) {
          beginPageIndex = 0;
        }
        var endPageIndex = this.state.currentPage + 3;
        this.setState({
          pageRange: Array.from(Array(this.state.pageCount).keys()).slice(beginPageIndex, endPageIndex)
        });
      }
    }

    if (prevState.sortAsc !== this.state.sortAsc) {
      var beginRowIndex = this.state.currentPage * this.state.pageSize;
      var endRowIndex = beginRowIndex + this.state.pageSize;
      var newPageItems = this.state.projects.slice(beginRowIndex, endRowIndex);
      this.setState({
        pageItems: newPageItems
      });
    }
  }

  sortHandler(category) {
    var sortStr = category;
    if (!this.state.sortAsc) {
      sortStr = '-' + category;
    }
    var sortedProjects = this.state.projects.sort(sortRows(sortStr));
    this.setState({
      projects: sortedProjects,
      sortAsc: !this.state.sortAsc, 
      sortedBy: sortStr
    });
  }

  get projectRows() {
    return this.state.pageItems.map((project) => 
          <tr key={project.project_id}>
            <th scope="row">
              <Link to={`/projects/${project.project_id}`}>{ project.firstname + ' ' + project.lastname}</Link>
            </th>
            <td>{ project.street }</td>
            <td>{ project.city }</td>
            <td>{ project.state }</td>
            <td>{ moment(project.lastmodified).format('M/D/YY') }</td>
        </tr>
    );
  }

  get pageRange() {
    return this.state.pageRange.map((page, i) => 
      <PaginationItem key={i} active={this.state.currentPage == page}>
        <PaginationLink
          onClick={e => this.handlePageClick(e, page)}
        >
          {page + 1}
        </PaginationLink>
      </PaginationItem>
    );
  }

  handlePageClick(e, index) {
    e.preventDefault();
    this.setState({
      currentPage: index
    });
  }

  progressStatus(statusNumber) {
    switch(statusNumber) {
      case 1:
        return <span><Badge color="" className="badge-dot"><i className="bg-info" /></Badge>In Progress</span>;
        break;
      case 2:
        return <span><Badge color="" className="badge-dot"><i className="bg-warning" /></Badge>On Hold</span>
      case 3:
        return <span><Badge color="" className="badge-dot"><i className="bg-success" /></Badge>Complete</span>
    }
  }

  render() {
    return (
      <div>
        <Card className="shadow">
          <CardHeader className="border-0">
            <h3 className="mb-0">
              Projects
              <Button tag={Link} to="/projects/submit-project" className="ml-4" type="button" color="success">
                <span className="btn-inner--icon">
                  <i className="ni ni-fat-add"></i>
                </span>
                <span className="btn-inner--text">NEW PROJECT</span>
              </Button>
            </h3>
          </CardHeader>
          <Table className="align-items-center table-flush" responsive>
            <thead className="thead-light">
              <tr>
                <th scope="col">
                  <a onClick={() => this.sortHandler('firstname')} href="#">
                    Project Name { this.state.sortedBy.includes('firstname') && <i className={ this.state.sortAsc ? "ni ni-bold-down" : "ni ni-bold-up"} /> }
                  </a>
                </th>
                <th scope="col">
                  <a onClick={() => this.sortHandler('street')} href="#">
                    Street Address { this.state.sortedBy.includes('street') && <i className={ this.state.sortAsc ? "ni ni-bold-down" : "ni ni-bold-up"} /> }
                  </a>
                </th>
                <th scope="col">
                  <a onClick={() => this.sortHandler('city')} href="#">
                    City { this.state.sortedBy.includes('city') && <i className={ this.state.sortAsc ? "ni ni-bold-down" : "ni ni-bold-up"} /> }
                  </a>
                </th>
                <th scope="col">
                  <a onClick={() => this.sortHandler('state')} href="#">
                    State { this.state.sortedBy.includes('state') && <i className={ this.state.sortAsc ? "ni ni-bold-down" : "ni ni-bold-up"} /> }
                  </a>
                </th>
                <th scope="col">
                  <a onClick={() => this.sortHandler('lastmodified')} href="#">
                    Date Modified { this.state.sortedBy.includes('lastmodified') && <i className={ this.state.sortAsc ? "ni ni-bold-down" : "ni ni-bold-up"} /> }
                  </a>
                </th>
              </tr>
            </thead>
            <tbody>
              { this.projectRows }
            </tbody>
          </Table>
          <CardFooter className="py-4">
            <nav aria-label="...">
              <Pagination
                className="pagination justify-content-end mb-0"
                listClassName="justify-content-end mb-0"
              >
                <PaginationItem disabled={ this.state.currentPage <= 0 }>
                  <PaginationLink
                    onClick={ e => this.handlePageClick(e, this.state.currentPage - 1) }
                  >
                    <i className="ni ni-bold-left" />
                    <span className="sr-only">Previous</span>
                  </PaginationLink>
                </PaginationItem>
                { this.pageRange }
                <PaginationItem disabled={ this.state.currentPage >= this.state.pageCount - 1 }>
                  <PaginationLink
                    onClick={ e => this.handlePageClick(e, this.state.currentPage + 1) }
                  >
                    <i className="ni ni-bold-right" />
                    <span className="sr-only">Next</span>
                  </PaginationLink>
                </PaginationItem>
              </Pagination>
            </nav>
          </CardFooter>
        </Card>
      </div>
    );
  }
}

export default ProjectsTable;
