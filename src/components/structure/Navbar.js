import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import AppBar from '@material-ui/core/AppBar';

import { SignOut } from '../logging/Logging';
import { auth } from '../logging/Logging';
import AvatarUser from './Avatar';
import { connect } from 'react-redux';
import { postokr } from '../../actions/okrActions';
import ModalBell from '../notifications/ModalBell';
import '../../styles/style2.css';
import '../../styles/style.css';

function NavbarSofKa({ dispatch, classes }) {
    const { displayName, photoURL } = auth.currentUser || { uid: "", displayName: "", photoURL: "", email: "" }
    const onclick = () => {
        dispatch(postokr())
    }

    return (
        <AppBar position="fixed" className={classes.appBar} style={{ background: "#F0950E" }} >
            <div className="col-md">
                <Navbar collapseOnSelect expand="lg" variant="dark">
                    <Navbar.Brand ><Link to="/Home" onClick={onclick} style={{ color: "#ffffff" }}>
                        <h1 className="title">SOFKA OKR</h1></Link> </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                        </Nav>
                        <Nav>
                            <Col xs="1">
                                <ModalBell />
                            </Col>
                        </Nav >
                        <Nav >
                            <Col xs="1">
                                <AvatarUser displayName={displayName} photoURL={photoURL} />
                            </Col>
                        </Nav >
                        <Nav>
                            <Col xs="1">
                                <SignOut />
                            </Col>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        </AppBar>
    )
}


export default connect()(NavbarSofKa);