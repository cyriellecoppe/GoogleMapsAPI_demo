import React from 'react'
import $ from 'jquery'

import QuickSearchCarousel from './QuickSearchCarousel.jsx'
import NearbyPlacesCarousel from './NearbyPlacesCarousel.jsx'
import SearchBar from './SearchBar.jsx'


export default class MapContainer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            filter: '',
            focusedCard: {index: null, id: null},
            focusedMarker: null,
            input: '',
            // default location: Vancouver, BC
            location: new google.maps.LatLng(49.272, -123.143),
            map: null,
            markers: [],
            results: [],
        }
        this.clearAll = this.clearAll.bind(this)
        this.clearFocusedCard = this.clearFocusedCard.bind(this)
        this.clearFocusedMarker = this.clearFocusedMarker.bind(this)
        this.clearMarkers = this.clearMarkers.bind(this)
        this.createFocusedMarker = this.createFocusedMarker.bind(this)
        this.createMarkers = this.createMarkers.bind(this)
        this.nearbySearch = this.nearbySearch.bind(this)
        this.setFilter = this.setFilter.bind(this)
        this.setFocusedCard = this.setFocusedCard.bind(this)
        this.setFocusedMarker = this.setFocusedMarker.bind(this)
        this.setInput = this.setInput.bind(this)
        this.setLocation = this.setLocation.bind(this)
    }

    clearAll() {
        this.clearMarkers()
        this.clearFocusedMarker()
        this.setState({
            filter: '',
            focusedCard: {index: null, id: null},
            focusedMarker: null,
            input: '',
            markers: [],
            results: [],
        })
    }

    clearFocusedCard() {
        if (this.state.focusedCard.id !== null) {
            $('#card__' + this.state.focusedCard.id).removeClass('is-focused')
        }
    }

    clearFocusedMarker() {
        if (this.state.focusedMarker !== null) {
            this.state.focusedMarker.setMap(null)
        }
    }

    clearMarkers() {
        for (let i = 0; i < this.state.markers.length; i++) {
            this.state.markers[i].setMap(null)
        }
    }

    createFocusedMarker(location, label) {
        this.clearFocusedMarker()
        this.setState({focusedMarker: new google.maps.Marker({
            map: this.state.map,
            position: location,
            label: label.toUpperCase(),
            zIndex: 1,
        })})
    }

    createMarkers() {
        this.clearMarkers()
        let markers = []
        for (let i = 0; i < this.state.results.length; i++) {
            let marker = new google.maps.Marker({
                map: this.state.map,
                position: this.state.results[i].geometry.location,
            })
            markers.push(marker)
            google.maps.event.addListener(marker, 'click', function () {
                this.setFocusedCard(i, this.state.results[i].id)
            }.bind(this))
        }
        this.setState({markers: markers})
    }

    nearbySearch() {
        if (this.state.input.length !== 0) {
            let service = new google.maps.places.PlacesService(this.state.map)
            let location = this.state.map.getCenter()
            service.nearbySearch(
                {location: location, radius: 1000, keyword: this.state.input},
                function (results) {
                    this.setState({results: results}, this.createMarkers)
                }.bind(this)
            )
        }
    }

    setFilter(filter) {
        this.setState({filter: filter})
    }

    setFocusedCard(index, id) {
        this.clearFocusedMarker()
        this.clearFocusedCard()
        this.setState(
            {focusedCard: {index: index, id: id}},
            function () { $('#card__' + id).addClass('is-focused') }
        )
    }

    setFocusedMarker(location, label) {
        this.clearFocusedCard()
        this.createFocusedMarker(location, label)
        this.state.map.panTo(location)
    }

    setInput(input) {
        this.clearFocusedMarker()
        this.setState({input: input, results: []}, this.nearbySearch)
    }

    setLocation(location) {
        this.setState({location: location}, this.nearbySearch)
    }

    componentDidMount() {
        this.setState({
            map: new google.maps.Map(
                document.getElementById('map-maker__map'),
                {center: this.state.location, zoom: 15}
            )
        }, function () {
            this.state.map.addListener('dragend', function () {
                this.setLocation(this.state.map.getCenter())
            }.bind(this))
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    let location = new google.maps.LatLng(
                        position.coords.latitude,
                        position.coords.longitude
                    )
                    this.setState(
                        {location: location},
                        function () {
                            this.state.map.panTo(location)
                        }.bind(this)
                    )
                }.bind(this))
            }
        })
    }

    render() {
        return (
            <div className="container-fluid">
                <SearchBar
                    clearAll={this.clearAll}
                    setInput={this.setInput}
                    setFilter={this.setFilter}
                />
                <QuickSearchCarousel
                    filter={this.state.filter}
                    setInput={this.setInput}
                />
                <div className="row justify-content-center">
                    <div className="col-11" id="map-maker__map"></div>
                </div>
                <NearbyPlacesCarousel
                    results={this.state.results}
                    setFocusedMarker={this.setFocusedMarker}
                    focusedCard={this.state.focusedCard}
                />
            </div>
        )
    }
}
