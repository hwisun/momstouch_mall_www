import React, { Component } from 'react'
import Axios from 'axios'
import { withRouter } from 'react-router-dom';

import { inject } from 'mobx-react';

@inject('rootStore')
class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: 'admin',
            password: 'admin',
        }
    }

    onInputChanged = (event) => {
        const target = event.target;
        if (target.name === 'username') {
            this.setState({
                username: target.value
            });
        } else if (target.name === 'password') {
            this.setState({
                password: target.value
            });
        }
    }

    onLogin = () => {
        const { rootStore, history } = this.props
        Axios.post(
            rootStore.BASE_URL + '/o/token/',
            {
                grant_type: 'password',
                client_id: 'YYvIjmLiRcvrikzjrlIAfQbKurCZdYoxIIDELPxm',
                username: this.state.username,
                password: this.state.password
            }
        ).then((response) => {
            const token = response.data;
            rootStore.authStore.setToken(token);
            rootStore.userStore.setUser()
            history.push('/');
        })
    }

    render() {
        return (
            <div id='containel'>
                <h3>로그인 페이지</h3>
                <div id='login'>
                    <div>
                        <label>아이디 : </label>
                        <input type='text' name='username'
                            value={this.state.username}
                            onChange={this.onInputChanged}
                        />
                    </div>
                    <div>
                        <label>비밀번호 : </label>
                        <input type='password' name='password'
                            value={this.state.password}
                            onChange={this.onInputChanged}
                        />

                    </div>
                    <button onClick={this.onLogin}>로그인</button>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);