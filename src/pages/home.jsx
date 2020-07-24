import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';

import { Button } from '../components/button';
import {getDateAction} from '../store/date/actions';

import {createLink} from './helper';
import {DAYS_VALUES} from '../constants/buttonNames';

import './home.scss';
const block = 'home';

class HomeContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      longitude: 0,
      latitude:0,
    }
  }
  
componentDidMount(){
    navigator.geolocation.getCurrentPosition((position)=>{
      let latitude, longitude,startPos;
        startPos = position;
        latitude = startPos.coords.latitude;
        longitude = startPos.coords.longitude;

        this.setState({latitude:latitude, longitude:longitude});
        this.makeRequest(latitude,longitude);

    });
}

makeRequest(latitude, longitude,date = 'today'){
  axios.get(createLink(latitude,longitude,date))
  .then((res)=> {
    this.props.getDateValues(res.data.results);
    }
  );
}

handleButtonClick = (e)=>{
  const {latitude, longitude} = this.state;
  const {target:{id}} = e;
  switch (id) {
    case DAYS_VALUES.ONE_WEEK_AGO:
      this.makeRequest(latitude, longitude, moment().add(-7, 'days').format('YYYY-MM-DD'));
    break
    case DAYS_VALUES.ONE_DAY_AGO:
      
      this.makeRequest(latitude, longitude,moment().add(-1, 'days').format('YYYY-MM-DD'));
    break

    case DAYS_VALUES.ONE_DAY_FORWARD:
      this.makeRequest(latitude, longitude, moment().add(1, 'days').format('YYYY-MM-DD'));
    break

    case DAYS_VALUES.ONE_WEEK_FORWARD:
      this.makeRequest(latitude, longitude,moment().add(7, 'days').format('YYYY-MM-DD'));
    break

    default:
      this.makeRequest(latitude, longitude);
   
  }

}

renderWeatherInfo(sunrise,sunset,dayLength){
  return(
    <div>
      <div><span className={`${block}__weather-info-details`}>Sunrise:</span> {sunrise && sunrise.substring(0,4)}</div>
      <div><span className={`${block}__weather-info-details`}>Sunset:</span> {sunset && sunset.substring(0,4)}</div>
      <div><span className={`${block}__weather-info-details`}>Length:</span> {dayLength && dayLength.substring(0,5)}</div>
    </div>
  )
}

calculateWidth(begin, end){
 const beginMin = moment.duration(moment(begin, ["h:mm A"]).format("HH:mm")).asMinutes();
 const endMin = moment.duration(moment(end, ["h:mm A"]).format("HH:mm")).asMinutes();
 return endMin - beginMin;
}

  renderBody() {
    const {
      weatherInfo:{
      sunrise,
      sunset,
      day_length, 
      civil_twilight_begin,
       civil_twilight_end}
      } = this.props;
    const nightAM =civil_twilight_begin &&  moment.duration(moment(civil_twilight_begin, ["h:mm A"]).format("HH:mm")).asMinutes();;
    const civilAM = this.calculateWidth(civil_twilight_begin, sunrise);
    const dayDuration= day_length && moment.duration(moment(day_length, ["h:mm A"]).format("HH:mm")).asMinutes();
    const civilPM = this.calculateWidth(sunset, civil_twilight_end);
    const nightPM =  this.calculateWidth('12:00 PM', civil_twilight_end);
    return (
      <div className={`${block}`}>
      <div className={`${block}__weather-info`}>
          <div>{ moment().format('DD/MM/YYYY')}</div>
          {this.renderWeatherInfo(sunrise,sunset,day_length)}
      </div>
      <div className={`${block}__wrapper-buttons`} >
      {Object.keys(DAYS_VALUES).map(key => {
        return <Button text={DAYS_VALUES[key]} onClick={this.handleButtonClick} id={DAYS_VALUES[key]} key={`id-${key}`} color='purple'/>
      })}
      </div>
      <div style={{width:'1440px', height:'30px', backgroundColor: '#f4f4f4', margin: '0 auto', display: 'flex'}}>
        <div style={{width: `${nightAM}px`, backgroundColor: 'pink',height: '30px'}}></div>
        <div style={{width: `${civilAM}px`, backgroundColor: 'yellow',height: '30px'}}></div>
        <div style={{width: `${dayDuration}px`, backgroundColor: 'green',height: '30px'}}> </div>
        <div style={{width: `${civilPM}px`, backgroundColor: 'yellow',height: '30px'}}></div>
        <div style={{width: `${nightPM}px`, backgroundColor: 'pink',height: '30px'}}></div>
      </div>
      {/* Диаграмму  в отдельный компонент, стили в файл, константы цветов  в отдельный файл, функцию перевода в минуты в хелпер */}
      </div>
    );
  }


  render() {
    return (
         this.renderBody()
    );
  }
}

const mapStateToProps = (state) => ({
    weatherInfo: state.weatherInfo,
});

const mapDispatchToProps = (dispatch) => {
    return {
         getDateValues: (res) => dispatch(getDateAction(res)),
    }
  }


export const Home = connect(
    mapStateToProps,
    mapDispatchToProps
  )(HomeContainer)

