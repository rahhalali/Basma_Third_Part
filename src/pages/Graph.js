import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { Bar } from "react-chartjs-2";
import SessionContext from "../context/SessionContext";
import axios from "axios";
import styled from "styled-components";

export const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const Filter = styled.div`
  // margin: 5px;
`;

export const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
`;

export const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
`;
export const Option = styled.option``;

function Graph() {
  const {
    session: {
      user: { access_token },
    },
  } = useContext(SessionContext);

  const [BarChart, setBarChart] = useState([]);

  async function handleChange(e) {
    const index = e.target.selectedIndex;
    const optionElement = e.target.childNodes[index];
    const optionElementId = optionElement.getAttribute("value");

    let result = await axios.get(
      `https://powerful-retreat-11092.herokuapp.com/api/admins/getAverage?name=${optionElementId}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    setBarChart({
      datasets: [
        {
          label: " Nb. of Users ",
          data: result.data,
          backgroundColor: "rgba(255, 99, 71, 1)",
          barThickness: 40,
        },
      ],
    });
  }

  return (
    <>
      <Navbar />
      <div className="App">
        <h1 style={{marginTop:"30px"}}>Count of Users and Average Registration</h1>
        <FilterContainer>
          <Filter>
            <FilterText>Filter:</FilterText>
            <Select onChange={handleChange} defaultChecked={true}>
              <Option value={""} selected>
                ------
              </Option>
              <Option value={"last_month"}>Last_month</Option>
              <Option value={"last_3months"}>Last_3months</Option>
              <Option value={"last_week"}>Last_week</Option>
              <Option value={"last_year"}>Last_year</Option>
              <Option value={"last_24hours"}>Last_24Hours</Option>
            </Select>
          </Filter>
        </FilterContainer>
        {BarChart.length !== 0 && (
          <Bar
            data={BarChart}
            options={{
              responsive: true,
              title: { text: "THICCNESS SCALE", display: true },
            }}
          />
        )}
        {/* <Bar
          data={{
            labels: [
              "last_month",
              "last_3months",
              "last_week",
              "last_24Hours",
              "last_year",
            ],
            datasets: [
              {
                label: "Nb. of Users",
                data: [100, 200, 300, 400, 500, 600],
                backgroundColor: "red",
                barThickness: 12,
              },
              {
                label: "Average",
                data: [100, 500, 300, 343, 43, 343],
                backgroundColor: "rgba(9, 5, 72, 0.6)",
                barThickness: 12,
              },
            ],
          }}
          options={{
            scales: {
              xAxes: [
                {
                  gridLines: {
                    color: "cyan",
                  },
                  scaleLabel: {
                    labelString: "Months",
                    display: true,
                    fontColor: "blue",
                    fontSize: 20,
                  },
                  ticks: {
                    fontColor: "green",
                  },
                },
              ],
              yAxes: [
                {
                  gridLines: {
                    color: "cyan",
                  },
                  scaleLabel: {
                    labelString: "Revenue",
                    display: true,
                    fontColor: "blue",
                    fontSize: 20,
                  },
                  ticks: {
                    beginAtZero: true,
                    fontColor: "green",
                  },
                },
              ],
            },
          }}
        ></Bar> */}
      </div>
    </>
  );
}

export default Graph;
