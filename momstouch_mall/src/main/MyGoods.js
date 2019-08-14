import React from 'react'
import ListBox from './ListBox';
import { inject, observer } from 'mobx-react';

@inject('rootStore','httpService')
@observer
class MyGoods extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            goods: [],
            user: []
        })
    }

    componentDidMount() {
        this.props.httpService.indexMyGoods()
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
        
    }

    render() {       
        const lists = this.state.goods.map((goods) => {
            return (
                <ListBox key={goods.goods.id} goods={goods.goods} count={goods.count} />
            )
        })

        return (
            <div id='containel'>
                <h3>장바구니 목록</h3>
                <h4>남은 포인트 : {this.state.user.point}P</h4>
                {lists}
            </div>
        )
    }
}

export default MyGoods;