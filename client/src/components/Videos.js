import React from 'react'

const Videos = ({ videos }) => (
    <React.Fragment>
        {
            videos.map((value, index) => (
                <Video
                    key={index}
                    video={value}
                />
            ))
        }
    </React.Fragment>
)

const Video = ({ video: { link, title, shortDescription } }) => (
    <div className="card video-card" >
        <iframe
            width="100%"
            height="400"
            src={link}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen></iframe>
        <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{shortDescription}</p>
        </div>
    </div>
)

export default Videos