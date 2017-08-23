import React from 'react'
import Slider from 'react-slick'
import $ from 'jquery'


function ButtonQuickSearch(props) {
    return (
        <button
            className={"btn quick-search__button " + props.type.color}
            onClick={function () {
                props.setInput(props.type.name)
                $('#search-bar__input').val(props.type.name)
            }}
        >{props.type.name}</button>
    )
}


export default class QuickSearchCarousel extends React.Component {

    constructor(props) {
        super(props)
        this.state = {typesList: types}
        this.settings = {
            arrows: true,
            className: 'col-11',
            centerMode: false,
            infinite: false,
            slidesToScroll: 3,
            swipeToSlide: true,
            swipe: true,
            variableWidth: true,
        }
        this.filterTypes = this.filterTypes.bind(this)
        this.setTypes = this.setTypes.bind(this)
    }

    filterTypes(filter) {
        let filtered = []
        for (let type of types) {
            if (type.name.includes(filter.toLowerCase())) {
                filtered.push(type)
            }
        }
        return filtered
    }

    setTypes(filter) {
        let filteredTypes = this.filterTypes(filter)
        this.setState({typesList: filteredTypes})
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.filter !== nextProps.filter) {
            this.setTypes(nextProps.filter)
        }
    }

    componentDidMount() {
        this.setTypes(this.props.filter)
    }

    render() {
        return (
            <div id="quick-search__carousel" className="row justify-content-center" role="toolbar" aria-label="Quick search">
                {this.state.typesList.length === 0 ? (
                    <div id="quick-search__placeholder" className="col-12 text-center text-muted">
                        <h5>No suggestions</h5>
                    </div>
                ) : (
                    <Slider {...this.settings}>
                        {this.state.typesList.map((type) =>
                            <div key={type.name}><ButtonQuickSearch
                                type={type}
                                setInput={this.props.setInput}
                            /></div>
                        )}
                    </Slider>
                )}
            </div>
        )
    }
}


// See https://developers.google.com/places/supported_types
const types = [
    {
        name: 'restaurant',
        color: "quick-search__color--blue",
    },
    {
        name: 'atm',
        color: "quick-search__color--medium-blue",
    },
    {
        name: 'bus station',
        color: "quick-search__color--dark-blue",
    },
    {
        name: 'cafe',
        color: "quick-search__color--light-blue",
    },
    {
        name: 'car repair',
        color: "quick-search__color--turquoise",
    },
    {
        name: 'bar',
        color: "quick-search__color--dark-gray",
    },
    {
        name: 'train station',
        color: "quick-search__color--blue",
    },
    {
        name: 'transit station',
        color: "quick-search__color--dark-gray",
    },
    {
        name: 'airport',
        color: "quick-search__color--dark-blue",
    },
    {
        name: 'doctor',
        color: "quick-search__color--blue",
    },
    {
        name: 'art gallery',
        color: "quick-search__color--dark-gray",
    },
    {
        name: 'bakery',
        color: "quick-search__color--blue",
    },
    {
        name: 'bank',
        color: "quick-search__color--dark-blue",
    },
    {
        name: 'beauty salon',
        color: "quick-search__color--light-blue",
    },
    {
        name: 'book store',
        color: "quick-search__color--turquoise",
    },
    {
        name: 'bowling alley',
        color: "quick-search__color--blue",
    },
    {
        name: 'car wash',
        color: "quick-search__color--turquoise",
    },
    {
        name: 'campground',
        color: "quick-search__color--light-blue",
    },
    {
        name: 'gym',
        color: "quick-search__color--light-blue",
    },
    {
        name: 'hair care',
        color: "quick-search__color--turquoise",
    },
    {
        name: 'convenience store',
        color: "quick-search__color--dark-gray",
    },
    {
        name: 'clothing store',
        color: "quick-search__color--turquoise",
    },
    {
        name: 'movie theater',
        color: "quick-search__color--dark-blue",
    },
    {
        name: 'car dealer',
        color: "quick-search__color--turquoise",
    },
    {
        name: 'church',
        color: "quick-search__color--dark-blue",
    },
    {
        name: 'car rental',
        color: "quick-search__color--turquoise",
    },
    {
        name: 'city hall',
        color: "quick-search__color--light-blue",
    },
    {
        name: 'dentist',
        color: "quick-search__color--dark-blue",
    },
    {
        name: 'department store',
        color: "quick-search__color--turquoise",
    },
    {
        name: 'florist',
        color: "quick-search__color--medium-blue",
    },
    {
        name: 'hospital',
        color: "quick-search__color--dark-gray",
    },
    {
        name: 'museum',
        color: "quick-search__color--light-blue",
    },
    {
        name: 'liquor store',
        color: "quick-search__color--dark-gray",
    },
    {
        name: 'park',
        color: "quick-search__color--dark-blue",
    },
    {
        name: 'parking',
        color: "quick-search__color--dark-gray",
    },
    {
        name: 'police',
        color: "quick-search__color--medium-blue",
    },
    {
        name: 'post office',
        color: "quick-search__color--blue",
    },
    {
        name: 'shopping mall',
        color: "quick-search__color--light-blue",
    },
    {
        name: 'spa',
        color: "quick-search__color--turquoise",
    },
    {
        name: 'store',
        color: "quick-search__color--dark-gray",
    },
    {
        name: 'subway station',
        color: "quick-search__color--light-blue",
    },
    {
        name: 'pharmacy',
        color: "quick-search__color--turquoise",
    },
    {
        name: 'veterinary care',
        color: "quick-search__color--light-blue",
    },
    {
        name: 'night club',
        color: "quick-search__color--turquoise",
    },
    {
        name: 'insurance agency',
        color: "quick-search__color--blue",
    },
    {
        name: 'aquarium',
        color: "quick-search__color--turquoise",
    },
    {
        name: 'jewelry store',
        color: "quick-search__color--medium-blue",
    },
    {
        name: 'laundry',
        color: "quick-search__color--turquoise",
    },
    {
        name: 'lawyer',
        color: "quick-search__color--light-blue",
    },
    {
        name: 'gas station',
        color: "quick-search__color--medium-blue",
    },
    {
        name: 'hardware store',
        color: "quick-search__color--turquoise",
    },
    {
        name: 'furniture store',
        color: "quick-search__color--medium-blue",
    },
    {
        name: 'hindu temple',
        color: "quick-search__color--blue",
    },
    {
        name: 'home goods store',
        color: "quick-search__color--light-blue",
    },
    {
        name: 'library',
        color: "quick-search__color--dark-blue",
    },
    {
        name: 'local government office',
        color: "quick-search__color--light-blue",
    },
    {
        name: 'locksmith',
        color: "quick-search__color--dark-gray",
    },
    {
        name: 'meal delivery',
        color: "quick-search__color--turquoise",
    },
    {
        name: 'lodging',
        color: "quick-search__color--dark-gray",
    },
    {
        name: 'meal takeaway',
        color: "quick-search__color--light-blue",
    },
    {
        name: 'mosque',
        color: "quick-search__color--turquoise",
    },
    {
        name: 'movie rental',
        color: "quick-search__color--blue",
    },
    {
        name: 'painter',
        color: "quick-search__color--dark-blue",
    },
    {
        name: 'moving company',
        color: "quick-search__color--blue",
    },
    {
        name: 'pet store',
        color: "quick-search__color--dark-blue",
    },
    {
        name: 'plumber',
        color: "quick-search__color--light-blue",
    },
    {
        name: 'physiotherapist',
        color: "quick-search__color--dark-blue",
    },
    {
        name: 'real estate agency',
        color: "quick-search__color--dark-blue",
    },
    {
        name: 'roofing contractor',
        color: "quick-search__color--medium-blue",
    },
    {
        name: 'rv park',
        color: "quick-search__color--turquoise",
    },
    {
        name: 'school',
        color: "quick-search__color--dark-gray",
    },
    {
        name: 'shoe store',
        color: "quick-search__color--blue",
    },
    {
        name: 'stadium',
        color: "quick-search__color--dark-gray",
    },
    {
        name: 'storage',
        color: "quick-search__color--turquoise",
    },
    {
        name: 'synagogue',
        color: "quick-search__color--light-blue",
    },
    {
        name: 'accounting',
        color: "quick-search__color--dark-blue",
    },
    {
        name: 'casino',
        color: "quick-search__color--blue",
    },
    {
        name: 'cemetery',
        color: "quick-search__color--turquoise",
    },
    {
        name: 'amusement park',
        color: "quick-search__color--dark-blue",
    },
    {
        name: 'courthouse',
        color: "quick-search__color--medium-blue",
    },
    {
        name: 'bicycle store',
        color: "quick-search__color--dark-blue",
    },
    {
        name: 'electrician',
        color: "quick-search__color--turquoise",
    },
    {
        name: 'electronics store',
        color: "quick-search__color--blue",
    },
    {
        name: 'embassy',
        color: "quick-search__color--turquoise",
    },
    {
        name: 'travel agency',
        color: "quick-search__color--light-blue",
    },
    {
        name: 'fire station',
        color: "quick-search__color--turquoise",
    },
    {
        name: 'university',
        color: "quick-search__color--dark-gray",
    },
    {
        name: 'funeral home',
        color: "quick-search__color--turquoise",
    },
    {
        name: 'taxi stand',
        color: "quick-search__color--light-blue",
    },
    {
        name: 'zoo',
        color: "quick-search__color--light-blue",
    },
]
