import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';
class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    render() {
        let summary = <Redirect to="/" />
        if(this.props.ings) {
            const purchaseRedirect = this.props.purchased ? <Redirect to="/" /> : null
             summary = (<div>
                {purchaseRedirect}
            <CheckoutSummary 
            onCheckoutContinued = {this.checkoutContinuedHandler}
            onCheckoutCancelled = {this.checkoutCancelledHandler} 
            ingredients={this.props.ings} />
            <Route 
            path={this.props.match.path + '/contact-data'} 
            component= {ContactData}/>
            </div>
             )
        }
        return summary 
    };
}
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased

    }
}

export default connect(mapStateToProps)(Checkout);