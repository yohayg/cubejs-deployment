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
                            query={{ measures: ["Events.count"], timezone: 'America/Los_Angeles', limit: 10, offset: 1 }}
                            render={resultSet => renderSingleValue(resultSet, "Events.count")}
                        />
                    </Col>
                </Row>

            </Container>
        );
    }
}

export default App;