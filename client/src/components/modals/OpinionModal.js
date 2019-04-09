import React from 'react'
import CustomModal from "../CustomModal";
import PropTypes from 'prop-types'

const Header = ({ title }) => (
    <h3>{title}</h3>
)

const Opinions = ({ reviews }) => {
    console.log(reviews)
    return (
        <div>
            {
                reviews.map((value, index) => (
                    <h5 key={index}>{value.username}</h5>
                ))
            }
        </div>
    )
}

Opinions.propTypes = {
    reviews: PropTypes.array.isRequired
}


export default ({ reviews, ...props }) => {
    console.log(props)
    return (
        <CustomModal
            Body={() => Opinions({ reviews })}
            Header={() => Header({ title: "Opinie o kursie" })}
            {...props}
        />
    )
}


