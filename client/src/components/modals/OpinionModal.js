import React from 'react'
import CustomModal from "../CustomModal";
import PropTypes from 'prop-types'
import { Image } from 'react-bootstrap';
import { PUBLIC_RESOURSES_URL } from '../../utils/variables';
import StarRating from '../ReactStars'

const Header = ({ title }) => (
    <h3>{title}</h3>
)

const Opinions = ({ reviews }) => {
    return (
        <div>
            {
                reviews.map((value, index) => {
                    console.log(value)
                    return (
                        <Opinion
                            key={index}
                            {...value}
                        />
                    )
                })
            }
        </div>
    )
}

const Opinion = ({ image, username, content, grade }) => (
    <div className="opinion">
        <div className="opinion__image">
            <Image src={`${PUBLIC_RESOURSES_URL}/${image}`} rounded />
        </div>
        <div className="opinion__content">
            <h5>{username}</h5>
            <StarRating className="opinion__content__stars" size={25} count={5} value={grade} edit={false} />
            <p>{content}</p>
        </div>
    </div>
)

Opinion.propTypes = {
    image: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    grade: PropTypes.number.isRequired
}

Opinions.propTypes = {
    reviews: PropTypes.array.isRequired
}


export default ({ reviews, ...props }) => {
    console.log(props)
    // for(let i = 0; i < )
    return (
        <CustomModal
            Body={() => Opinions({ reviews })}
            Header={() => Header({ title: "Opinie o kursie" })}
            size="lg"
            centered
            {...props}
        />
    )
}


