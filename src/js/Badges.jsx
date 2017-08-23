import React from 'react'


function StarIcon(props) {
    return <i className={props.isActive ? "fa fa-star" : "fa fa-star-o"} aria-hidden="true"></i>

}

export function BadgeScore(props) {

    let score = Math.round(props.score)

    /*
        Create boolean array equivalent to score
        if score = 4/5, array = [1,1,1,1,0]
        then display 4 full icons and 1 empty icon
    */

    let icons = new Array(5).fill(false)
    for (let i = 0; i < score; i++) {
        icons[i] = true
    }

    return (
        <span className="badge__score--star">
            {icons.map((icon, index) =>
                <StarIcon key={index} isActive={icon}/>
            )}
        </span>
    )
}


export function BadgeOpeningHours(props) {
    let icon
    let text
    if (props.isOpen) {
        icon = 'fa-check'
        text = 'Open now'
    } else if (!props.isOpen) {
        icon = 'fa-times'
        text = 'Closed'
    } else {
        icon = 'fa-question'
        text = 'Opening hours unknown'
    }
    return (
        <div className="text-right" id="card-text__opening-hours">
            <span>{text}</span>
            <i className={"fa " + icon} aria-hidden="true"></i>
        </div>
    )
}
