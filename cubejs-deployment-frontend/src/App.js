import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
    BarChart,
    Bar
} from "recharts";
import moment from "moment";
import numeral from "numeral";
import cubejs from "@cubejs-client/core";
import Chart from "./Chart.js";

process.env.TZ = 'GMT';

const cubejsApi = cubejs(process.env.REACT_APP_CUBEJS_TOKEN, {
    apiUrl: process.env.REACT_APP_API_URL
});
const numberFormatter = item => numeral(item).format("0,0");
const dateFormatter = item => moment(item).format("MMM YY");

const renderSingleValue = (resultSet, key) => (
<h1 height={300}>{numberFormatter(resultSet.chartPivot()[0][key])}</h1>
);

class App extends Component {
    render() {
        return (
            <Container fluid>
        <Row>
        <Col sm="3">
            <Chart
        cubejsApi={cubejsApi}
        title="Total Clicks"
        query={{
            "measures": [
                "Events.clicks"
            ],
            "timeDimensions": [
                {
                    "dimension": "Events.eventTime"
                }
            ],
            "filters": []
        }}
        render={resultSet => renderSingleValue(resultSet, "Events.clicks")}
        />
        </Col>
        <Col sm="3">
            <Chart
        cubejsApi={cubejsApi}
        title="Total Impressions"
        query={{
            "measures": [
            "Events.impressions"
            ],
            "timeDimensions": [
        {
            "dimension": "Events.eventTime"
        }
            ],
            "filters": []
        }}
        render={resultSet => renderSingleValue(resultSet, "Events.impressions")}
        />
        </Col>
        <Col sm="3">
            <Chart
        cubejsApi={cubejsApi}
        title="Clicks from offer id=0"
        query={{
            measures: ["Events.clicks"],
                filters: [
                {
                    dimension: "Events.offerId",
                    operator: "equals",
                    values: ["80"]
                }
            ]
        }}
        render={resultSet => renderSingleValue(resultSet, "Events.clicks")}
        />
        </Col>
        <Col sm="3">
            <Chart
        cubejsApi={cubejsApi}
        title="Clicks from offer id=1"
        query={{
            measures: ["Events.clicks"],
            filters: [
                {
                    dimension: "Events.offerId",
                    operator: "equals",
                    values: ["90"]
                }
            ]
        }}
        render={resultSet => renderSingleValue(resultSet, "Events.clicks")}
        />
        </Col>
        </Row>
        <br />
        <br />
        <Row>
        <Col sm="6">
            <Chart
        cubejsApi={cubejsApi}
        title="New Clicks Over Time"
        query={{
            measures: ["Events.clicks"],
                timeDimensions: [
                {
                    dimension: "Events.eventTime",
                    dateRange: ["2019-08-01", "2019-09-29"],
                    granularity: "day"
                }
            ]
        }}
        render={resultSet => (
            <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={resultSet.chartPivot()}>
            <XAxis dataKey="category" tickFormatter={dateFormatter} />
        <YAxis tickFormatter={numberFormatter} />
        <Tooltip labelFormatter={dateFormatter} />
        <Area
        type="monotone"
        dataKey="Events.clicks"
        name="Clicks"
        stroke="rgb(106, 110, 229)"
        fill="rgba(106, 110, 229, .16)"
            />
            </AreaChart>
            </ResponsiveContainer>
    )}
        />
        </Col>
        <br />
        <br />
        <Col sm="6">
            <Chart
        cubejsApi={cubejsApi}
        title="clicks by offer Over time"
        query={{
            measures: ["Events.clicks"],
                dimensions: ["Events.offerId"],
                timeDimensions: [
                {
                    dimension: "Events.eventTime",
                    dateRange: ["2019-07-27", "2019-07-28"],
                    granularity: "hour"
                }
            ]
        }}
        render={resultSet => {
                return (
            <ResponsiveContainer width="100%" height={300}>
            <BarChart data={resultSet.chartPivot()}>
            <XAxis tickFormatter={dateFormatter} dataKey="x" />
            <YAxis tickFormatter={numberFormatter} />
        <Bar
        stackId="a"
        dataKey="0, Events.clicks"
        name="Offer ID 0"
        fill="#7DB3FF"
            />
            <Bar
        stackId="b"
        dataKey="1, Events.clicks"
        name="Offer ID 0"
        fill="#7DB3FF"
            />
            <Bar
        stackId="a"
        dataKey="0, Events.clicks"
        name="Offer ID 1"
        fill="#49457B"
            />
            {/*<Bar*/}
        {/*    stackId="a"*/}
        {/*    dataKey="completed, TrackingClicks.count"*/}
        {/*    name="Completed"*/}
        {/*    fill="#FF7C78"*/}
        {/*/>*/}
    <Legend />
        <Tooltip />
        </BarChart>
        </ResponsiveContainer>
    );
    }}
        />
        </Col>
        </Row>
        <br />
        <br />
        <Row>
        <Col sm="12 ">
            <Chart
        cubejsApi={cubejsApi}
        title="Clicks Over time"
        query={{
            measures: ["Events.clicks"],
                timeDimensions: [
                {
                    "dimension": "Events.eventTime",
                    "granularity": "hour"
                }
            ]
        }}
        render={resultSet => {
                return (
            <ResponsiveContainer width="100%" height={300}>
            <BarChart data={resultSet.chartPivot()}>
            <XAxis tickFormatter={dateFormatter} dataKey="x" />
            <YAxis tickFormatter={numberFormatter} />
        <Bar
        stackId="a"
        dataKey="Events.clicks"
        name="Clicks"
        fill="#7DB3FF"
            />
            {/*<Bar*/}
        {/*    stackId="a"*/}
        {/*    dataKey="0, TrackingClicks.count"*/}
        {/*    name="Offer ID 1"*/}
        {/*    fill="#49457B"*/}
        {/*/>*/}
        {/*<Bar*/}
        {/*    stackId="a"*/}
        {/*    dataKey="completed, TrackingClicks.count"*/}
        {/*    name="Completed"*/}
        {/*    fill="#FF7C78"*/}
        {/*/>*/}
    <Legend />
        <Tooltip />
        </BarChart>
        {/*<Chart scale={{ x: { tickCount: 8 } }} height={400} data={resultSet.chartPivot()} forceFit>*/}
        {/*    <Axis name="x" />*/}
        {/*    <Axis name="measure" />*/}
        {/*    <Tooltip />*/}
        {/*    <Geom type="intervalStack" position={`x*measure`} color="color" />*/}
        {/*</Chart>*/}
    </ResponsiveContainer>
    );
    }}
        />
        </Col>
        </Row>
        <br />
        <br />
        <Row>
        <Col sm="12 ">
            <Chart
        cubejsApi={cubejsApi}
        title="Impressions Over time"
        query={{
            measures: ["Events.impressions"],
                timeDimensions: [
                {
                    dimension: "Events.eventTime",
                    // dateRange: ["2019-07-27", "2019-07-28"],
                    granularity: "hour"
                }
            ]
        }}
        render={resultSet => {
                return (
            <ResponsiveContainer width="100%" height={300}>
            <BarChart data={resultSet.chartPivot()}>
            <XAxis tickFormatter={dateFormatter} dataKey="x" />
            <YAxis tickFormatter={numberFormatter} />
        <Bar
        stackId="a"
        dataKey="Events.impressions"
        name="Impressions"
        fill="#7DB3FF"
            />
            {/*<Bar*/}
        {/*    stackId="a"*/}
        {/*    dataKey="0, TrackingClicks.count"*/}
        {/*    name="Offer ID 1"*/}
        {/*    fill="#49457B"*/}
        {/*/>*/}
        {/*<Bar*/}
        {/*    stackId="a"*/}
        {/*    dataKey="completed, TrackingClicks.count"*/}
        {/*    name="Completed"*/}
        {/*    fill="#FF7C78"*/}
        {/*/>*/}
    <Legend />
        <Tooltip />
        </BarChart>
        </ResponsiveContainer>
    );
    }}
        />
        </Col>
        </Row>
        </Container>
    );
    }
}

export default App;