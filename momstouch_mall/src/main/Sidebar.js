import React from 'react'
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';

@inject('rootStore')
@observer
class Sidebar extends React.Component {

    componentDidMount() {
        this.props.rootStore.menuStore.getMenuList()
    }

    render() {
        const menuList = this.props.rootStore.menuStore.menuList;
        const list = menuList.map(menu => {
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