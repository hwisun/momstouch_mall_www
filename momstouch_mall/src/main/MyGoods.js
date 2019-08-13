import React from 'react'
import ListBox from './ListBox';
import { inject, observer } from 'mobx-react';

@inject('rootStore')
@observer
class MyGoods extends React.Component {


    componentDidMount() {
        console.log(this.props.rootStore.goodStore);
        
        this.props.rootStore.goodStore.getMyGoods();
    }

    render() {
        console.log(this.props.rootStore.goodStore);
        
        const lists = this.props.rootStore.goodStore.myGoodsList.map((goods) => {
            return (
                <ListBox key={goods.goods.id} goods={goods.goods} count={goods.count} />
            )
        })

        return (
            <div id='containel'>
                <h3>장바구니 목록</h3>
                {lists}
            </div>
        )
    }
}

export default MyGoods;