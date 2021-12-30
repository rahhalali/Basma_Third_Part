import React, { useState, useEffect, useContext } from "react";
import "./Table.css";
import {
  Find,
  FilterContainer,
  FilterText,
  Filter,
  Select,
  Option,
  FilterSearch,
  Caption,
} from "./TableListElement";
import axios from "axios";
import FadeLoader from "react-spinners/FadeLoader";
import "bootstrap/dist/css/bootstrap.min.css";
// import ReactPaginate from "react-paginate";
import Pagination from "react-js-pagination";
import SessionContext from "../../context/SessionContext";

function TableList() {
  const {
    session: {
      user: { access_token },
    },
  } = useContext(SessionContext);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState("");
  const [search, setSearch] = useState("");
  const [current_page, setCurrent] = useState(0);
  const [total, setTotal] = useState(0);
  const [per_page, setPerPage] = useState(0);
  // const [pageNumber, setPageNumber] = useState(0);

  // const usersPerPage = 20;
  // const pagesVisited = pageNumber * usersPerPage;

  const onChange = (e) => {
    if (e.target.value === "----") {
      setPagination("");
    } else if (e.target.value === "20") {
      setPagination(20);
    } else if (e.target.value === "40") {
      setPagination(40);
    } else if (e.target.value === "60") {
      setPagination(60);
    }
    console.log(e.target.value);
  };

  const getData = async (page = 1) => {

    let result = await axios.get(
      `http://localhost:8000/api/admins/filter?nb=${pagination}&&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    setUsers(result.data.users.data);
    setCurrent(result.data.users.current_page);
    setTotal(result.data.users.total);
    setPerPage(result.data.users.per_page);
    setLoading(false);
    
  };

  useEffect(() => {

  getData();

  }, [getData,pagination]);

  const filterUsers = users.filter((user) => {
    return user.first_name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div>
      <Find>
        <FilterContainer>
          <Filter>
            <FilterText>Filter:</FilterText>
            <Select onChange={onChange} defaultChecked={true}>
              <Option selected>----</Option>
              <Option value={20}>20</Option>
              <Option value={40}>40</Option>
              <Option value={60}>60</Option>
            </Select>
          </Filter>

          <FilterSearch>
            <input
              className="nosubmit"
              type="search"
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </FilterSearch>
        </FilterContainer>
      </Find>
      <Caption>List of Registered Users</Caption>
      <table>
        <thead>
          <tr>
            <th>First_name</th>
            <th>Last_name</th>
            <th>Email</th>
          </tr>
        </thead>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginLeft: "700px",
              marginTop: "200px",
            }}
          >
            <FadeLoader
              size={15}
              color={"rgb(235, 95, 95)"}
              loading={loading}
            />
          </div>
        ) : (
          <tbody>
            {filterUsers &&
              filterUsers.map((user) => {
                return (
                  <tr key={user.id}>
                    <td data-label="First_Name">{user.first_name}</td>
                    <td data-label="Last_Name">{user.last_name}</td>
                    <td data-label="Email">{user.email}</td>
                  </tr>
                );
              })}
          </tbody>
        )}
      </table>
      <div className="mt-3 pagina">
        <Pagination
          activePage={current_page}
          totalItemsCount={total}
          itemsCountPerPage={per_page}
          onChange={(pagination) => getData(pagination)}
          itemClass="page-item"
          linkClass="page-link"
          firstPageText="First"
          lastPageText="Last"
        />
      </div>
    </div>
  );
}

export default TableList;
