import React from 'react';
import { inject, observer } from 'mobx-react';

import Sidebar from './Sidebar';
import ListBox from './ListBox';

@inject('rootStore')
@observer
class Home extends React.Component {

    componentDidUpdate(prevProps) {
        if (this.props.match.params.menuId !== prevProps.match.params.menuId) {
            this.props.rootStore.goodStore.getGoodsList(this.props.match.params.menuId);
        }
    }

    componentDidMount() {
        this.props.rootStore.goodStore.getGoodsList(this.props.match.params.menuId);
    }
    
    render() {
        const goodsList = this.props.rootStore.goodStore.goodsList;
        const list = goodsList.map(goods => {
            return(
                <ListBox key={goods.id} goods={goods}/>
            )
        })
        console.log(goodsList);
        
        return(
            <div>
                <Sidebar />
                <div id='content'>
                    <h2>Home</h2>
                    {list}
                </div>
            </div>
        );
    }
}

export default Home; 