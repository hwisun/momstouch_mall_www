import React from 'react'
import { inject, observer } from 'mobx-react';

@inject('rootStore')
@observer
class Detail extends React.Component {

    componentDidMount() {   
        this.props.rootStore.goodStore.getGoods(this.props.match.params.goodsId);
    }

    onPurchase = () => {
        this.props.rootStore.goodStore.onPurchase();
    }

    onToCart = () => {
        this.props.rootStore.cartStore.addGoodsToCart(this.props.rootStore.goodStore.goods)
    }

    render() {
        const { desc, id, image, menu, price, title } = this.props.rootStore.goodStore.goods ? this.props.rootStore.goodStore.goods : null;
        
        return (
            <div>
                <img src={image} alt={title} />
                <p>{title}</p>
                <p>{desc}</p>
                <button onClick={this.onPurchase}>구입</button>
                <button onClick={this.onToCart}>담기</button>
            </div>
        )
    }
}

export default Detail;