import React from 'react'
import { inject, observer } from 'mobx-react';

@inject('rootStore', 'httpService')
@observer
class Detail extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            user: [],
            goods: [],
            reviews: [],
            textarea: null
        })
    }


    componentDidMount() {
        this.props.httpService.getGoods(this.props.match.params.goodsId)
            .then(goods => {
                this.setState({
                    goods
                })
            });
        this.props.httpService.getMe()
            .then(user => {
                this.setState({
                    user
                })
            });
        this.props.httpService.indexReview(this.props.match.params.goodsId)
            .then(reviews => {
                this.setState({
                    reviews
                })
            });
    }

    onInputChanged = (event) => {
        const target = event.target;
        if (target.name === 'textarea') {
            this.setState({
                textarea: target.value
            });
        }
    }

    onPurchase = () => {
        this.props.httpService.purchase(this.state.goods);
    }

    onToCart = () => {
        this.props.rootStore.cartStore.addGoodsToCart(this.state.goods)
    }

    onToReview = () => {
        this.props.httpService.addReview(this.state.user.id, this.state.goods.id, this.state.textarea);
    }


    render() {
        const { desc, id, image, menu, price, title } = this.state.goods ? this.state.goods : null;
        console.log(this.state.reviews);
        
        const reviewList = this.state.reviews.map(review => {
            return (
                <div>
                    <div className='comment'>
                        {review.user.username} |  {review.comment} | {review.grade}
                    </div>
                </div>
            )
        })

        return (
            <div>
                <div className='detail'>
                    <div className='left'>
                        <img src={image} alt={title} />
                    </div>
                    <div className='left'>
                        <p>{title}</p>
                        <p>{desc}</p>
                        <button onClick={this.onPurchase}>구입</button>
                        <button onClick={this.onToCart}>담기</button>
                    </div>
                </div>
                <div>
                    <div className='menu'>리뷰</div>
                </div>
                <div>
                    <div className='area'>
                        <button className='left' onClick={this.onToReview}>리뷰 작성</button>
                        <textarea name='textarea' value={this.state.textarea}
                            onChange={this.onInputChanged}></textarea>
                    </div>
                </div>
                {reviewList}
            </div>
        )
    }
}

export default Detail;