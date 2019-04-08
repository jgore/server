import React, { Component } from 'react';
import { Card, Button, Container } from 'react-bootstrap'
import Main from '../components/Main'
import { API_URL } from '../utils/variables'
import Axios from 'axios'
import Loading from '../components/Loading'
import Courses from '../components/courses'

class Home extends Component {

    state = {
        courses: [],
        isLoading: true,
        error: null
    }

    componentDidMount() {
        Axios(`${API_URL}/courses`)
            .then((res) => {
                this.setState({
                    courses: res.data,
                    error: null
                })
            }).catch((err) => {
                if (err.response) {
                    this.setState({
                        error: err.response.status
                    })
                } else {
                    this.setState({
                        error: 500
                    })
                }
            }).finally(() => {
                this.setState({
                    isLoading: false
                })
            })
    }
    render() {
        return (
            <Main>
                <div className="Home">
                    <h1>Kursy</h1>
                    {
                        this.state.isLoading ?
                            <Loading /> :
                            <Courses
                                courses={this.state.courses}
                            />
                    }
                </div>
            </Main>
        )
    }
}



export default Home;