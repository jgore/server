import React, { Component } from 'react';
import Error from '../components/Error'
import Main from '../components/Main';

class NotFound extends Component {
    render() {
        return (
            <div className="NotFound">
                <Main>
                    <Error
                        errorCode={404}
                    />
                </Main>
            </div>
        );
    }
}

export default NotFound;