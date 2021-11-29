import {Col, Container, Row, Table} from "react-bootstrap";
import React from "react";
import jsonData from './list_json.json'

function GetRow() {
    const data = [...jsonData]
    return data.map((el, i) => {
        return (
            <tr key={i}>
                <td>{el.num}</td>
                <td><a href={"/" + el.num}>{el.name}</a></td>
            </tr>
        )
    })
}

function List() {

return (
        <Container>
        <Row>
            <Col lg={12}>
                <Table striped bordered hover variant="light">
                    <tbody>
                    <GetRow/>
                    </tbody>
                </Table>
            </Col>
        </Row>
</Container>
)
}

export default List
