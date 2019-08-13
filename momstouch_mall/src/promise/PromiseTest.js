import React from 'react'
import { Promise } from 'q';

class PromiseTest extends React.Component {
    
    callback(func) {
        for (let i = 0; i < 10; i++) {
            func(i);
        }
    }

    callbackTest = () => {
        const callbackFunc = function(i) {
            console.log('callback' + i)
        }
        this.callback(callbackFunc);
    }

    promiseTest = () => {
        const promise = new Promise((a, b) => {
            console.log(1);
            
        });

        promise.then((b) => {
            console.log(b);
            
            console.log('promise then');
        }).catch((a) => {
            console.log('promise catch')
        });
    }
    
    render() {
        return(
            <div>
                <h1>Promise Test</h1>
                <button onClick={this.callbackTest}>Callback</button>
                <button onClick={this.promiseTest}>Promise</button>
            </div>
        )
    }
}

export default PromiseTest