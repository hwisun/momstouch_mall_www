import React from 'react'

import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react';

import ListBox from './ListBox';

@inject('rootStore')
@observer
class MyCart extends React.Component {

    onPurchase = () => {
        this.props.rootStore.cartStore.purchaseCartGoods();
    }

    clearCart = () => {
        this.props.rootStore.cartStore.clearCartGoods();
    }

    render() {

        const lists = this.props.rootStore.cartStore.cartGoods.map((goods) => {
            return (
                <ListBox key={goods.goods.id} goods={goods.goods} count={goods.count} />
            )
        })

        return (
            <div id='containel'>
                <h3>장바구니 목록</h3>
                <button onClick={this.clearCart}>비우기</button>
                <button onClick={this.onPurchase}>전부구입</button>
                <br />
                {lists}
            </div>
        )
    }
}

export default withRouter(MyCart);