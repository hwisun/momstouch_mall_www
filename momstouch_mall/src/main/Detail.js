import React from 'react'
import { inject, observer } from 'mobx-react';

@inject('rootStore', 'httpService')
@observer
class Detail extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = ({
            goods: []
        })
    }


    componentDidMount() {   
        this.props.httpService.getGoods(this.props.match.params.goodsId)
        .then(goods => {
            this.setState({
                goods
            })
        });
    }

    onPurchase = () => {
        this.props.httpService.purchase(this.state.goods);
    }

    onToCart = () => {
        this.props.rootStore.cartStore.addGoodsToCart(this.state.goods)
    }

    render() {
        const { desc, id, image, menu, price, title } = this.state.goods ? this.state.goods : null;
        
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