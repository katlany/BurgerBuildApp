import React, { Component } from 'react';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';
class Layout extends Component {    
    state = {
        showSideDrawer: false,
    }
    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }
    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer};
        });
    }
    render () {

        return ( 
            <React.Fragment>
            <Toolbar 
            isAuth = {this.props.isAuthenticated}
            drawerToggleClicked = {this.sideDrawerToggleHandler} />
            <SideDrawer
            isAuth = {this.props.isAuthenticated} 
            open={this.state.showSideDrawer}  
            closed={this.sideDrawerClosedHandler}/>
            <main className={classes.Content}>
            {this.props.children}
            </main>
            </React.Fragment>
        )
    }
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
    }
}
export default connect(mapStateToProps)(Layout);