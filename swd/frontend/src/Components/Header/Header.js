
import React from 'react';
import PropTypes from 'prop-types';
import s from './Header.css';
import Navigation from '../Navigation';

class Header extends React.Component {

  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    toggleSideBar: PropTypes.func.isRequired,
    sideBarOpen: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
  };

  render() {
    return (
      <div className={s.root}>
        <Navigation
          toggleSideBar={this.props.toggleSideBar}
          sideBarOpen={this.props.sideBarOpen}
          isLoggedIn={this.props.isLoggedIn}
          login={this.props.login}
          logout={this.props.logout}
        />
        {/* <div className={s.container}>
          <Link className={s.brand} to="/">
            <span className={s.brandTxt}>BITS Pilani, Goa</span>
          </Link>

          <div className={s.banner}>
            <div style={{ height: 70 }} />
            <img src={logoUrl} style={{ maxWidth: '80%' }} alt="SWD" />
            <h1 className={s.bannerTitle}>SWD</h1>
            <p className={s.bannerDesc}>Student Welfare Division</p>
          </div>
        </div> */}
      </div>
    );
  }
}

export default (Header);
