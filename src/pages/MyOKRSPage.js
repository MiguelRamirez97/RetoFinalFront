import React, { useEffect } from 'react';
import NavbarSofKa from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Toolbar from '@material-ui/core/Toolbar';
import { estilos } from '../components/DesignNaSi';
// import KrCard from '../components/Card';
import { connect } from 'react-redux';
import { getOwnOKR } from '../actions/okrActions';
import OkrCard from '../components/OkrCard';
import '../styles/OkrFormCss.css';
import { Link } from 'react-router-dom';

const MyOKRSPage = ({ dispatch, userId, okrs }) => {
  useEffect(() => {
    dispatch(getOwnOKR(userId));
  }, [dispatch, userId]);
  
  const classes = estilos();
  
  return (
    okrs === [] ?
    <div className={classes.root}>
      <NavbarSofKa classes={classes} />
      <Sidebar texto='Crear OKR' ruta='/CreateOKR' />
      <main className={classes.content}>
        <Toolbar />
        {
          <div className="invitacionOkr" >
            <h1>No se encuentran OKR</h1>
            <p>Para empezar por favor crea una OKR</p>
            <Link to={'/CreateOKR'} className="link">
              Crear OKR
            </Link>
          </div>
        }
      </main>
    </div>
:
<div className={classes.root}>
      <NavbarSofKa classes={classes} />
      <Sidebar texto='Crear OKR' ruta='/CreateOKR' />
      <main className={classes.content}>
        <Toolbar />
          {okrs.map((okr) => (
            <OkrCard key={okr.id} okr={okr} />
            ))}
      </main>
    </div>


  );
};

const mapStateToProps = (state) => ({
  userId: state.okr.OKR.userId,
  okrs: state.okr.OKRUser,
});

export default connect(mapStateToProps)(MyOKRSPage);
