import React from 'react'
import Slider from 'react-slick'

import { BadgeScore, BadgeOpeningHours } from './Badges.jsx'

/* eslint react/no-string-refs: "off" */


function PlaceCard(props) {
    let place = props.place
    let name = place.name
    let label = name.charAt(0)
    let location = new google.maps.LatLng(
        props.place.geometry.location.lat(),
        props.place.geometry.location.lng()
    )
    return (
        <div
            className="card nearby-place__card"
            id={"card__" + place.id}
            onClick={() => props.setFocusedMarker(location, label)}
        >
            <div className="card-block">
                <h6 className="card-title">{name}</h6>
                {place.vicinity === undefined ? null : (
                    <div className="text-muted" id="card-text__address">
                        {place.vicinity}
                    </div>
                )}
                {place.opening_hours === undefined ? (
                    <BadgeOpeningHours isOpen={'none'} />
                ) : (
                    <BadgeOpeningHours isOpen={place.opening_hours.open_now} />
                )}
            </div>
            <div className="card-footer text-right">
                {place.rating === undefined ? (
                    <span className="text-muted">No rating available</span>
                ) : (
                    <div>
                        <span className="text-muted">{place.rating + '/5'}
                        </span>
                        <BadgeScore score={place.rating} />
                    </div>
                )}
            </div>
        </div>
    )
}


export default class NearbyPlacesCarousel extends React.Component {

    constructor(props) {
        super(props)
        this.state = {isArrowUp: false, shouldOpenCarousel: true}
        this.settings = {
            className: 'col-11',
            slidesToShow: 6,
            centerMode: false,
            arrows: true,
            slidesToScroll: 5,
            swipeToSlide: true,
            swipe: true,
            infinite: false,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        className: 'col-11',
                        slidesToShow: 4,
                        centerMode: false,
                        arrows: true,
                        slidesToScroll: 2,
                        swipeToSlide: true,
                        infinite: false,
                        swipe: true,
                    }
                },
                {
                    breakpoint: 575,
                    settings: {
                        className: 'col-11',
                        slidesToShow: 2,
                        centerMode: false,
                        arrows: true,
                        slidesToScroll: 2,
                        swipeToSlide: true,
                        infinite: false,
                        swipe: true,
                    }
                },
            ]
        }
        this.toggleCarousel = this.toggleCarousel.bind(this)
    }

    toggleCarousel() {
        this.setState({
            isArrowUp: !this.state.isArrowUp,
            shouldOpenCarousel: !this.state.shouldOpenCarousel})
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.focusedCard !== nextProps.focusedCard &&
            nextProps.results.length !== 0) {
            this.setState(
                {isArrowUp: false, shouldOpenCarousel: true},
                function () {
                    this.refs.slider.slickGoTo(nextProps.focusedCard.index)
                }
            )
        } else if (nextProps.results.length === 0) {
            this.setState({isArrowUp: false, shouldOpenCarousel: false})
        }
    }

    render() {
        if (this.props.results.length === 0) return null
        return (
            <div className="col-12" id="nearby-place__container">
                <div
                    className="col-md-2 col-sm-3 col-4"
                    id="nearby-place__toggle-button"
                    onClick={this.toggleCarousel}
                >
                    <span>See details</span>
                    <i className={this.state.isArrowUp ? (
                        "fa fa-angle-double-up"
                    ) : (
                        "fa fa-angle-double-down"
                    )}
                    aria-hidden="true"
                    ></i>
                </div>
                {!this.state.shouldOpenCarousel ? null : (
                    <div className="row justify-content-center" id="nearby-place__row">
                        <Slider ref='slider' {...this.settings}>
                            {this.props.results.map((place, index) =>
                                <span className="col-md-4" key={place.id}>
                                    <PlaceCard
                                        place={place}
                                        index={index}
                                        setFocusedMarker={this.props.setFocusedMarker}
                                    />
                                </span>
                            )}
                        </Slider>
                    </div>
                )}
            </div>
        )
    }
}
