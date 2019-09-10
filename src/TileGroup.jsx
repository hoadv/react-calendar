import React from 'react';
import PropTypes from 'prop-types';

import Flex from './Flex';

import { getTileClasses, isCurrentDate } from './shared/utils';
import { tileGroupProps } from './shared/propTypes';

export default function TileGroup({
  className,
  count,
  dateTransform,
  dateType,
  end,
  hover,
  offset,
  start,
  step,
  tile: Tile,
  value,
  valueType,
  itemVisibilityClass,
  ...tileProps
}) {
  const tiles = [];
  let countDays = 1;
  let weekIndex = 0;
  let displayWeekIndex = 0;

  const numberDaysOfOneRow = 7;

  for (let point = start; point <= end; point += step) {
    const date = dateTransform(point);

    if (countDays % numberDaysOfOneRow === 0) {
      weekIndex += 1;
    }

    if (isCurrentDate(date, dateType)) {
      displayWeekIndex = weekIndex;
      break;
    }

    countDays += 1;
  }

  let countDays1 = 0;

  for (let point = start; point <= end; point += step) {
    const date = dateTransform(point);
    const itemClasses = getTileClasses({
      value, valueType, date, dateType, hover, weekIndex,
    });

    if (Math.floor(countDays1 / numberDaysOfOneRow) !== displayWeekIndex) {
      itemClasses.push(itemVisibilityClass || '');
    } else {
      itemClasses.push('current-date-row');
    }

    tiles.push(
      <Tile
        key={date.getTime()}
        classes={itemClasses}
        date={date}
        point={point}
        {...tileProps}
      />,
    );

    countDays1 += 1;
  }

  return (
    <Flex
      className={className}
      count={count}
      offset={offset}
      wrap
    >
      {tiles}
    </Flex>
  );
}

TileGroup.propTypes = {
  ...tileGroupProps,
  activeStartDate: PropTypes.instanceOf(Date),
  count: PropTypes.number,
  dateTransform: PropTypes.func.isRequired,
  itemVisibilityClass: PropTypes.string,
  offset: PropTypes.number,
  step: PropTypes.number,
  tile: PropTypes.func.isRequired,
};

TileGroup.defaultProps = {
  count: 3,
  step: 1,
};
