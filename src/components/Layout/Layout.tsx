import Header from "../Header/Header.tsx";
import {Outlet, useNavigate} from "react-router";
import {Col, Flex, Row} from "antd";
import {useAppSelector} from "../../app/hooks.ts";
import {selectLoggedIn} from "../../Slices/users.ts";

export const Layout = () => {
    const isLoggedIn = useAppSelector(selectLoggedIn);
    const navigate = useNavigate();
    if (!isLoggedIn) navigate("/login")
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