import React from 'react';
import { convertToMinutes } from '../../helpers/minutesConverter';
import cn from 'classnames';

import './diagram.scss';

const block = 'diagram';

export default function Diagram({
  civil_twilight_begin,
  sunrise,
  sunset,
  day_length,
  civil_twilight_end,
  isDateChanging,
}) {
  const nightAM = civil_twilight_begin && convertToMinutes(civil_twilight_begin);
  const civilAM = civil_twilight_begin && sunrise && calculateWidth(civil_twilight_begin, sunrise);
  const dayDuration = day_length && convertToMinutes(day_length);
  const civilPM =  sunset && civil_twilight_end && calculateWidth(sunset, civil_twilight_end);
  const nightPM = civil_twilight_end && calculateWidth('12:00 AM', civil_twilight_end);
  return (
    <div className={cn(
      block,
      { [`${block}--animate`]: isDateChanging })}>
      <div className={`${block}__night`} style={{ width: `${nightAM}px` }} ></div>
      <div className={`${block}__twilight--am`} style={{ width: `${civilAM}px` }}></div>
      <div className={`${block}__day`} style={{ width: `${dayDuration}px` }}> </div>
      <div className={`${block}__twilight--pm`} style={{ width: `${civilPM}px` }}></div>
      <div className={`${block}__night`} style={{ width: `${nightPM}px` }}></div>
    </div>
  );
}

function calculateWidth(begin, end) {
  const beginMin = convertToMinutes(begin);
  const endMin = convertToMinutes(end);
  return endMin - beginMin;
}
