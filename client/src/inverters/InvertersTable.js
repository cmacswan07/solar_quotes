import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardFooter,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink
} from "reactstrap";
import { sortRows } from "Utils";

class InvertersTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inverters: [],
      currentPage: 0,
      pageSize: 5,
      pageCount: 0,
      pageItems: [],
      pageRange: [],
      sortedBy: '',
      sortAsc: true
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.inverters !== this.props.inverters) {
      var pageCount = Math.ceil(this.props.inverters.length / this.state.pageSize);
      var beginIndex = this.state.currentPage;
      var endIndex = this.state.currentPage + 5;
      this.setState({
        inverters: this.props.inverters,
        pageCount: pageCount,
        pageItems: this.props.inverters.slice(0, 5),
        pageRange: Array.from(Array(pageCount).keys()).slice(beginIndex, endIndex)
      });      
    }

    if (prevState.currentPage !== this.state.currentPage) {
      // Get new page of module rows.
      var beginRowIndex = this.state.currentPage * this.state.pageSize;
      var endRowIndex = beginRowIndex + this.state.pageSize;
      var newPageItems = this.state.inverters.slice(beginRowIndex, endRowIndex);
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
      var newPageItems = this.state.inverters.slice(beginRowIndex, endRowIndex);
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
    var sortedInverters = this.state.inverters.sort(sortRows(sortStr));
    this.setState({
      inverters: sortedInverters,
      sortAsc: !this.state.sortAsc, 
      sortedBy: sortStr
    });
  }

  get inverterRows() {
    return this.state.pageItems.map((inverter) => 
      <tr key={inverter.inverter_id}>
        <th scope="row">
          <Link to={`/inverters/${inverter.inverter_id}`}>{ inverter.invertermake }</Link>
        </th>
        <td><Link to={`/inverters/${inverter.inverter_id}`}>{ inverter.invertermodel }</Link></td>
        <td>{ inverter.watts }</td>
        <td>{ inverter.invertertype }</td>
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
              Inverters
              <Button tag={Link} to="/inverters/submit-inverter" className="ml-4" type="button" color="success">
                <span className="btn-inner--icon">
                  <i className="ni ni-fat-add"></i>
                </span>
                <span className="btn-inner--text">NEW INVERTER</span>
              </Button>
            </h3>
          </CardHeader>
          <Table className="align-items-center table-flush" responsive>
            <thead className="thead-light">
              <tr>
                <th scope="col">
                  <a onClick={() => this.sortHandler('invertermake')} href="#">
                    Inverter Make { this.state.sortedBy.includes('invertermake') && <i className={ this.state.sortAsc ? "ni ni-bold-down" : "ni ni-bold-up"} /> }
                  </a>
                </th>
                <th scope="col">
                  <a onClick={() => this.sortHandler('invertermodel')} href="#">
                    Inverter Model { this.state.sortedBy.includes('invertermodel') && <i className={ this.state.sortAsc ? "ni ni-bold-down" : "ni ni-bold-up"} /> }
                  </a>
                </th>
                <th scope="col">
                  <a onClick={() => this.sortHandler('watts')} href="#">
                    Inverter Power { this.state.sortedBy.includes('watts') && <i className={ this.state.sortAsc ? "ni ni-bold-down" : "ni ni-bold-up"} /> }
                  </a>
                </th>
                <th scope="col">
                  <a href="#">
                    Inverter Type
                  </a>
                </th>
              </tr>
            </thead>
            <tbody>
              { this.inverterRows }
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

export default InvertersTable;
