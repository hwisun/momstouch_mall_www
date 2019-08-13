import React from 'react'
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

@inject('rootStore')
@observer
class Header extends React.Component {
    onLogout = () => {
        this.props.rootStore.authStore.deleteToken();
    }
    render() {
        return(
            <header>
                <div className='left'><Link to='/'>Home</Link></div>
                {this.props.rootStore.authStore.isLoggedIn ?
                    <div className='right'><Link to='#' onClick={this.onLogout}>logout</Link></div> :
                    <div className='right'><Link to='/login'>Login</Link></div>
                }
                {this.props.rootStore.authStore.isLoggedIn ?
                    <div className='right'><Link to='/mygoods'>MyGoods</Link></div> :
                    <div className='right'><Link to='/Register'>Register</Link></div>
                }
                {this.props.rootStore.authStore.isLoggedIn ?
                    <div className='right'><Link to='/mycart'>MyCart</Link></div> :
                    null
                }
            </header>
        )
    }
}

export default Header;