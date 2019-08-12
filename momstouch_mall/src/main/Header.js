import React from 'react'
import { Link } from 'react-router-dom';


class Header extends React.Component {
    render() {
        return(
            <header>
                <div className='left'><Link to='/'>Home</Link></div>
                <div className='right'><Link to='/login'>Login</Link></div>
            </header>
        )
    }
}

export default Header;