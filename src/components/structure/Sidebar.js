import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Divider, List, Drawer, Toolbar } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Accordion, Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

import { auth } from '../logging/Logging';
import { nombre } from './Avatar'


import '../../styles/style.css';
import { estilos } from './DesignNaSi';
import { cleanRedirect } from '../../actions/okrActions';
import '../../styles/style2.css';
import '../../styles/style.css';


function Sidebar({ texto, ruta, redirect, dispatch }) {

  useEffect(() => {
    dispatch(cleanRedirect())
  }, [redirect])

  const classes = estilos();
  return (
    <Drawer className={classes.drawer} variant="permanent" classes={{ paper: classes.drawerPaper }}>
      <Toolbar />
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>
          <Link to={ruta} style={{ color: "#ffffff" }} >
            <div className="centrar" >
              <Button id="btnAdmin" variant="outline-light" size="lg">
                {texto}
              </Button>
            </div>
          </Link>
        </List>
        <Toolbar />
        <Divider />
        <List>
          <Accordion >
            <Accordion.Toggle as={Card.Header} className="body" variant="link" eventKey="0" style={{ background: "#ffffff", color: "#000", cursor: "pointer" }}>
              Dashboard
              <ArrowDropDownIcon />
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body><Link to={`/AllOKRS`} className="button body" style={{ color: "#000" }}>Todos los OKR</Link></Card.Body>
            </Accordion.Collapse>
            <Divider />
            <Accordion.Collapse eventKey="0">
              <Card.Body><Link to={`/ShowMaxProgressOkr`} className="button body" style={{ color: "#000" }} >
                {nombre(auth.currentUser.displayName)}</Link></Card.Body>
            </Accordion.Collapse>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="1" className="body" style={{ background: "#ffffff", color: "#000", cursor: "pointer" }}>
              Administracion
              <ArrowDropDownIcon />
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body><Link to={`/ConfigurationNotifications`} className="button body" style={{ color: "#000" }}>Configuracion de notificaciones</Link></Card.Body>
            </Accordion.Collapse>
          </Accordion>
        </List>
      </div>
    </Drawer>
  )
}


const mapStateToProps = (state) => ({
  userId: state.okr.OKR.userId,
  redirect: state.okr.redirect
});

export default connect(mapStateToProps)(Sidebar);
