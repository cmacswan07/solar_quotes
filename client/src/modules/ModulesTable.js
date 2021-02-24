import React from "react";
import { Link } from "react-router-dom";
import { Card, Button, CardHeader, CardFooter, Table, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { sortRows } from "Utils";

class ModulesTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 5,
      modules: [],
      currentPage: 0,
      pageCount: 0,
      pageItems: [],
      pageRange: [],
      sortedBy: '',
      sortAsc: true
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.modules !== this.props.modules) {
      var pageCount = Math.ceil(this.props.modules.length / this.state.pageSize);
      var beginIndex = this.state.currentPage;
      var endIndex = this.state.currentPage + 5;
      this.setState({
        modules: this.props.modules,
        pageCount: pageCount,
        pageItems: this.props.modules.slice(0, 5),
        pageRange: Array.from(Array(pageCount).keys()).slice(beginIndex, endIndex)
      });
    }

    if (prevState.currentPage !== this.state.currentPage) {
      // Get new page of module rows.
      var beginRowIndex = this.state.currentPage * this.state.pageSize;
      var endRowIndex = beginRowIndex + this.state.pageSize;
      var newPageItems = this.state.modules.slice(beginRowIndex, endRowIndex);
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
      var newPageItems = this.state.modules.slice(beginRowIndex, endRowIndex);
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
    var sortedModules = this.state.modules.sort(sortRows(sortStr));
    this.setState({
      modules: sortedModules,
      sortAsc: !this.state.sortAsc, 
      sortedBy: sortStr
    });
  }

  get moduleRows() {
    return this.state.pageItems.map((item) => 
      <tr key={item.module_id}>
        <th scope="row">
          <Link to={`/modules/${item.module_id}`}>{ item.modulemake }</Link>
        </th>
        <td><Link to={`/modules/${item.module_id}`}>{ item.modulemodel }</Link></td>
        <td>{ item.watts }</td>
      </tr>
    )
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

  render() {
    return (
      <div>
        <Card className="shadow">
          <CardHeader className="border-0">
            <h3 className="mb-0">
              Modules
              <Button tag={Link} to="/modules/submit-module" className="ml-4 btn btn-success shadow" type="button" color="success">
                <span className="btn-inner--icon">
                  <i className="ni ni-fat-add"></i>
                </span>
                <span className="btn-inner--text">NEW MODULE</span>
              </Button>
            </h3>
          </CardHeader>
          <Table className="align-items-center table-flush" responsive>
            <thead className="thead-light">
              <tr>
                <th scope="col">
                  <a onClick={() => this.sortHandler('modulemake')} href="#">
                    Module Make { this.state.sortedBy.includes('modulemake') && <i className={ this.state.sortAsc ? "ni ni-bold-down" : "ni ni-bold-up"} /> }
                  </a>
                </th>
                <th scope="col">
                  <a onClick={() => this.sortHandler('modulemodel')} href="#">
                    Module Model { this.state.sortedBy.includes('modulemodel') && <i className={ this.state.sortAsc ? "ni ni-bold-down" : "ni ni-bold-up"} /> }
                  </a>
                </th>
                <th scope="col">
                  <a onClick={() => this.sortHandler('watts')} href="#">
                    Module Power { this.state.sortedBy.includes('watts') && <i className={ this.state.sortAsc ? "ni ni-bold-down" : "ni ni-bold-up"} /> }
                  </a>
                </th>
              </tr>
            </thead>
            <tbody>
              { this.moduleRows }
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

export default ModulesTable;