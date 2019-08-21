import React from 'react'
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

@inject('rootStore', 'httpService', 'history')
@observer
class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
        };
    }


    onLogout = () => {
        this.props.rootStore.authStore.deleteToken();
    }

    onInputChanged = (event) => {
        const target = event.target;
        if (target.name === 'search') {
            this.setState({
                searchText: target.value
            });
        }
    }

    search = () => {
        this.props.history.push('/tags/' + this.state.searchText);
    }

    render() {
        return(
            <header>
                <div className='left'><Link to='/'>Home</Link></div>
                {this.props.rootStore.authStore.isLoggedIn ?
                    <div>
                        <div className='right'><Link to='#' onClick={this.onLogout}>logout</Link></div>
                        <div className='right'><Link to='/mygoods'>MyGoods</Link></div>
                        <div className='right'><Link to='/mycart'>MyCart</Link></div>
                        <div className='right'><Link to='/myhistory'>MyHistory</Link></div>
                        <input
                            style={{ marginLeft: '1em' }}
                            value={this.state.searchText}
                            onChange={this.onInputChanged}
                            type="text"
                            name="search" />
                        <button onClick={this.search}>검색</button>
                    </div>
                     :
                     <div>
                        <div className='right'><Link to='/login'>Login</Link></div>
                        <div className='right'><Link to='/Register'>Register</Link></div>
                     </div>
                }
            </header>
        )
    }
}

export default Header;