import React from 'react'
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';

@inject('rootStore','httpService')
@observer
class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            menu: []
        })
    }

    componentDidMount() {
        this.props.httpService.getMenu()
        .then(menu => {
            this.setState({
                menu
            })
        })
    }

    render() {
        const list = this.state.menu.map(menu => {
            return (
                <div key={menu.id} className=''>
                    <Link to={'/menu/'+menu.id}>{menu.title}</Link>
                </div>
            )
        })
        return (
            <div id='sidebar'>
                {list}
            </div>
        )
    }
}

export default Sidebar;