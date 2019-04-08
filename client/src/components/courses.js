import React from 'react'


class Courses extends React.Component {
    render() {
        return (
            <React.Fragment>
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
