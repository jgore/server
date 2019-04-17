import React from 'react'

export const Toggle = ({ title, titleOnDrop, isDrop, onClick, ...props }) => {
    return (
        <div>
            {
                isDrop ?
                    <p onClick={() => onClick()} style={{textAlign: "center"}}>
                        {titleOnDrop}
                    </p> :
                    <p onClick={() => onClick()}  style={{textAlign: "center"}}>{title}</p>

            }
            {
                isDrop ?
                    <div className="toggle">
                        {
                            props.children
                        }
                    </div> :
                    ""
            }
        </div>
    )
}