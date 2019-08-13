import React from 'react'
import { withRouter } from 'react-router-dom'


class ListBox extends React.Component {

    goToDetail = () => {
        const goodsId = this.props.goods.id;
        this.props.history.push('/goods/' + goodsId)
    }

    render() {
        return (
            <div className='box left' onClick={this.goToDetail}>
                <img src={this.props.goods.image} alt={this.props.goods.title} />
                <p>{this.props.goods.title}</p>
                <p>{this.props.count ? this.props.count + '개': this.props.goods.price + 'P'}</p>
            </div>
        )
    }
}

export default withRouter(ListBox);