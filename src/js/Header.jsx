import React from 'react'


export default function Header(props) {
    return (
        <div className="container-fluid">
            <div id="header__brand" aria-label="logo">
                <i
                    id="header__brand--logo"
                    className="fa fa-lg fa-globe"
                    aria-hidden="true"
                ></i>
                <span id="header__brand--name">AroundMe</span>
            </div>
            <svg
                id="header__svg"
                preserveAspectRatio="none"
                viewBox="0 0 500 50"
                className="row"
            >
                <polygon
                    id="header__svg__polygon"
                    points="0,50 500,-20 500,50"
                />
                <line
                    id="header__svg__line--orange"
                    y1="10" x1="270"
                    y2="40" x2="500"
                />
                <line
                    id="header__svg__line--blue"
                    y1="45" x1="-20"
                    y2="-20" x2="500"
                />
            </svg>
        </div>
    )
}
