import React from 'react'


class ListBox extends React.Component {

    onDetail = () => {
        
    }

    render() {
        return (
            <div className='box left' onClick=''>
                <img src={this.props.goods.image} alt={this.props.goods.title} />
                <p>{this.props.goods.title}</p>
                <p>{this.props.goods.price}</p>
            </div>
        )
    }
}

export default ListBox;