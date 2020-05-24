import React, { useState, useEffect } from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Button,
} from "reactstrap";
import { Link } from 'react-router-dom';
import axios from "axios";
import Login from "../login";
import AdminLogout from "./adminLogout";

const NavBar = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(() => {
        (async function () {
            try {
                let response = await axios.get(
                    "http://localhost:5000/users/admin", {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token")
                    }
                }
                ).then((response) => {
                    console.log(response.status);
                    setIsLoggedIn(true);
                    console.log("isin : ", isLoggedIn)
                });

                console.log(response.data);
            } catch (error) {
                console.log("error is ...", error);
            }
        })();
    }, []);

    return (
        <Navbar color="light" light expand="md">
            <NavbarBrand >itiReads</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    {/* <NavItem>
                        <Link className="nav-link" to="/admin">Home</Link>
                    </NavItem> */}
                    <NavItem>
                        <Link className="nav-link" to="/admin/categories">Categories</Link>
                    </NavItem>
                    <NavItem>
                        <Link className="nav-link" to="/admin/books">Books</Link>
                    </NavItem>
                    <NavItem>
                        <Link className="nav-link" to="/admin/authors">Authors</Link>
                    </NavItem>
                </Nav>
                {/* <Button color="info">logout</Button> */}
                {console.log("is logged in : ", isLoggedIn)}
                {isLoggedIn === true ? (<AdminLogout />) : null}

            </Collapse>
        </Navbar>
    );
};

export default NavBar;
