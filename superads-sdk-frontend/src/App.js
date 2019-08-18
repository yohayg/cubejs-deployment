import React from 'react';
import cubejs from '@cubejs-client/core';
import { QueryRenderer } from '@cubejs-client/react';
import { Spin } from 'antd';
import { Row, Col, Statistic, Table } from 'antd';
import "antd/dist/antd.css";

const tableRender = ({ resultSet }) => (
    <Table
        pagination={false}
        columns={resultSet.tableColumns().map(c => ({ ...c, dataIndex: c.key }))}
        dataSource={resultSet.tablePivot()}
    />

);

const API_URL = "http://localhost:4000"; // change to your actual endpoint

const cubejsApi = cubejs(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NjUwNjc3NDQsImV4cCI6MTU2NTE1NDE0NH0.n4K2kA0xEtOplWtQpXUgnhwYtdr6RqRIIxmCrnQ5gmQ",
    { apiUrl: API_URL + "/cubejs-api/v1" }
);

const renderChart = (Component) => ({ resultSet, error }) => (
    (resultSet && <Component resultSet={resultSet} />) ||
    (error && error.toString()) ||
    (<Spin />)
)

const ChartRenderer = () => <QueryRenderer
    query={{
        "measures": [
            "Events.count"
        ],
        "timeDimensions": [
            {
                "dimension": "Events.createdAt"
            }
        ],
        "filters": [],
        "dimensions": [
            "Events.userId"
        ]
    }}
    cubejsApi={cubejsApi}
    render={renderChart(tableRender)}
/>;

export default ChartRenderer;