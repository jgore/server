import React from 'react'


class Courses extends React.Component {
    render() {
        console.log("asd")
        return (
            <React.Fragment>
                <h1>Kursy</h1>
                {
                    this.props.courses.map((value, index) => (
                        <Course
                            key={index}
                            coruse={value}
                        />
                    ))
                }
            </React.Fragment>
        )
    }
}

const Course = () => {

}

export default Courses
