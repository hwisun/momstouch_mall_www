import React from 'react'
import { inject } from 'mobx-react';
import ListBox from './ListBox';

@inject('httpService')
class MyHistory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            histories: []
        }
    }

    componentDidMount() {
        this.indexHistory();

    }

    indexHistory() {
        this.props.httpService.indexHistory()
        .then(histories => {
            this.setState({
                histories
            })
        });
    }

    refund = (historyId) => {
        this.props.httpService.refundHistory(historyId)
        .then(history => {
            this.indexHistory()
        })
    }

    render() {
        const histories = this.state.histories.map(history => {
            const goods = history.goods.map(historygood => {
                const good = historygood.goods;
                return(
                    <ListBox key={good.id} goods={good} count={historygood.count} />
                )
            });
            return(
                <div className='history-container'>
                    <h1>{history.created}</h1>
                    {!history.is_refunded &&
                    <div><button onClick={() => this.refund(history.id)}>환불</button></div>
                    }
                    {goods}
                </div>
            )
        })

        return(
            <div>
                {histories}
                
            </div>
        )
    }
}

export default MyHistory