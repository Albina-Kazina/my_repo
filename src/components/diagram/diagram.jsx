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
}) {
  const civilAM = civil_twilight_begin && sunrise && calculateWidth(civil_twilight_begin, sunrise);
  const dayDuration = day_length && convertToMinutes(day_length);
  const civilPM = sunset && civil_twilight_end && calculateWidth(sunset, civil_twilight_end);
  return (
    <div className={block}>
      <div className={`${block}__night`}></div>
      <div className={`${block}__twilight`}>
        <div className={cn(`${block}__twilight--am`,`${block}--animate`)} style={{ width: `${civilAM}px` }}></div>
        <div className={cn(`${block}__day`,`${block}--animate`)} style={{ width: `${dayDuration}px` }}> </div>
        <div className={cn(`${block}__twilight--pm`,`${block}--animate`)} style={{ width: `${civilPM}px` }}></div>
      </div>
    </div>
  );
}

function calculateWidth(begin, end) {
  const beginMin = convertToMinutes(begin);
  const endMin = convertToMinutes(end);
  return endMin - beginMin;
}
