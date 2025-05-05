import Header from "../Header/Header.tsx";
import { Outlet} from "react-router";
import {Col, Flex, Row} from "antd";

export const Layout = () => {
    return <>
        <Row>
            <Col span={24}><Header /></Col>
        </Row>
        <Row>
            <Flex wrap={"wrap"} justify={"center"} align={"top"}>
                <Outlet />
            </Flex>
        </Row>

    </>
}