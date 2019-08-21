import React from 'react';

import { inject } from 'mobx-react';

import ListBox from './ListBox';

@inject('httpService')
class TagGoods extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            goods: []
        };
    }

    componentDidMount() {
        this.indexGoods();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.tag !== prevProps.match.params.tag) {
            this.indexGoods();
        }
    }

    indexGoods() {
        const tag = this.props.match.params.tag;
        this.props.httpService.indexTagGoods(tag)
            .then(goods => {
                this.setState({
                    goods
                });
            });
    }

    render() {
        const list = this.state.goods.map(good => {
            return (
                <ListBox key={good.id} goods={good} />
            )
        });
        return (
            <div>
                <div id="container">
                    <div id="item-list-container">
                        {list}
                    </div>
                </div>
            </div>
        );
    }
}

export default TagGoods;