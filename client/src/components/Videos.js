import React, { useContext } from 'react'
import { Global } from '../App'

const Videos = ({ videos }) => (
    <div className="flexible flexible-column flexible-horizontal-center">
        {
            videos.map((value, index) => (
                <Video
                    key={index}
                    video={value}
                />
            ))
        }
    </div>
)

const Video = ({ video: { link, title, shortDescription } }) => {
    let width = "100%",
        height = "400"
    // dim = onResizeFrame(width, height)

    // globalContext.windowEvents.on("resize", function (e) {
    //     dim = onResizeFrame(width, height)
    //     console.log(dim)
    // })
    // console.log(dim)
    return (
        <div className="card video-card">
            <iframe
                width={width}
                height={height}
                src={link}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen></iframe>
            <div className="card-body card-body-custom">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{shortDescription}</p>
            </div>
        </div>
    )
}

// function onResizeFrame(width, height) {
//     if(window.innerWidth < 700) {
//         height = "200"
//     } else if(window.innerWidth < 700 && window.innerWidth > 450) {
//         height = "300"
//     } else{
//         height = "400"
//     }
//     return {
//         width,
//         height
//     }
// }

export default Videos