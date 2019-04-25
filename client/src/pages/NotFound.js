import React, { Component } from 'react';
import AppError from '../components/errors/AppError'
import Main from '../components/Main';

class NotFound extends Component {
    render() {
        return (
            <div className="NotFound">
                <Main>
                    <AppError
                        errorCode={404}
                    />
                </Main>
            </div>
        );
    }
}

export default NotFound;