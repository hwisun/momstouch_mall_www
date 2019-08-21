import React from 'react';
import { inject, observer } from 'mobx-react';

import Sidebar from './Sidebar';
import ListBox from './ListBox';

@inject('rootStore', 'httpService')
@observer
class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            goods: []
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.menuId !== prevProps.match.params.menuId) {
            this.props.httpService.indexGoods(this.props.match.params.menuId)
                .then(goods => {
                    this.setState({
                        goods
                    })
                })
        }
    }

    componentDidMount() {
        this.props.httpService.indexGoods(this.props.match.params.menuId)
            .then(goods => {
                this.setState({
                    goods
                })
            })
    }

    render() {
        // const goodsList = this.props.rootStore.goodStore.goodsList;
        const list = this.state.goods.map(goods => {
            if (goods.goods) {
                return (
                    <ListBox key={goods.goods.id} goods={goods.goods} />
                )
            } else {
                return (
                    <ListBox key={goods.id} goods={goods} />
                )
            }
            
        })

        return (
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