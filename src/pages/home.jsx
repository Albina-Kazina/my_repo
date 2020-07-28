import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';

import { Button } from '../components/button';
import { Loader } from '../components/loader';
import { Diagram } from '../components/diagram';
import { getDateAction } from '../store/date/actions';
import { urlBuilder } from '../helpers/urlBuilder';
import { DAYS_VALUES, dayValuesDefenition } from '../constants/buttonNames';
import Api from '../constants/api';

import './home.scss';

const block = 'home';

class HomeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      longitude: 0,
      latitude: 0,
      currentDate: '',
    }
  }

  componentDidMount() {
    this.setState({ currentDate: moment().format('DD/MM/YYYY') });
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let latitude, longitude, startPos;
        startPos = position;
        latitude = startPos.coords.latitude;
        longitude = startPos.coords.longitude;

        this.setState({ latitude: latitude, longitude: longitude });
        this.makeRequest(latitude, longitude);

      },
      (err) => { console.log('Error') }
    );
  }

  async makeRequest(latitude, longitude, date = 'today') {
    const result = await axios.get(urlBuilder(Api.Date.GET_DATA, { lat: latitude, lng: longitude, date: date }));
    this.props.getDateValues(result.data.results);
  }

  handleButtonClick = type => e => {
    const { latitude, longitude } = this.state;
    this.setState({
      currentDate: moment(this.state.currentDate, "DD-MM-YYYY").add(dayValuesDefenition[type], 'days').format('DD/MM/YYYY'),
    });
    this.makeRequest(
      latitude,
      longitude,
      dayValuesDefenition[type] &&
      moment(this.state.currentDate, "DD-MM-YYYY").add(dayValuesDefenition[type], 'days').format('YYYY-MM-DD'));
  }

  renderWeatherInfo(sunrise, sunset, dayLength) {
    return (
      <div className={`${block}__weather-info-item-wrapper`}>
        <div className={`${block}__weather-info-item`}><span className={`${block}__weather-info-details`}>Sunrise:</span> {sunrise && sunrise.substring(0, 4)}</div>
        <div className={`${block}__weather-info-item`}><span className={`${block}__weather-info-details`}>Sunset:</span> {sunset && sunset.substring(0, 4)}</div>
        <div className={`${block}__weather-info-item`}><span className={`${block}__weather-info-details`}>Length:</span> {dayLength && dayLength.substring(0, 5)}</div>
      </div>
    )
  }

  renderButtons() {
    return (
      <div className={`${block}__wrapper-buttons`} >
        {Object.keys(DAYS_VALUES).map(key => {
          return <Button text={DAYS_VALUES[key]}
            onClick={this.handleButtonClick(key)}
            key={`id-${key}`}
          />
        })}
      </div>
    )
  }

  renderBody() {
    const {
      weatherInfo: {
        sunrise,
        sunset,
        day_length,
        civil_twilight_begin,
        civil_twilight_end }
    } = this.props;
    const { currentDate } = this.state;
    return (
      <div className={block}>
        <div className={`${block}__weather-info`}>
          <div className={`${block}__current-date`}>{currentDate}</div>
          {this.renderWeatherInfo(sunrise, sunset, day_length)}
        </div>
        {this.renderButtons()}
        {currentDate !== '' ?
          <Diagram
            sunrise={sunrise}
            sunset={sunset}
            day_length={day_length}
            civil_twilight_begin={civil_twilight_begin}
            civil_twilight_end={civil_twilight_end} /> :
          <Loader />
        }
      </div>
    );
  }

  render() {
    return (
      this.renderBody()
    );
  }
}

const mapStateToProps = state => ({
  weatherInfo: state.weatherInfo,
});

const mapDispatchToProps = dispatch => ({
  getDateValues: (res) => dispatch(getDateAction(res)),
})

export const Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer)

