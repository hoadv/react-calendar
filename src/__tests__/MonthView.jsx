import React from 'react';
import { mount } from 'enzyme';

import MonthView from '../MonthView';

/* eslint-disable comma-dangle, react/prop-types */

const { format } = new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'long', year: 'numeric' });

describe('MonthView', () => {
  it('renders proper view when given activeStartDate', () => {
    const activeStartDate = new Date(2017, 0, 1);
    const component = mount(
      <MonthView
        activeStartDate={activeStartDate}
        showNeighboringMonth={false}
      />
    );

    const firstDayTile = component.find('.react-calendar__tile').first();
    const firstDayTileTimeAbbr = firstDayTile.find('abbr').prop('aria-label');

    expect(firstDayTileTimeAbbr).toBe(format(activeStartDate));
  });

  it('applies tileClassName to its tiles when given a string', () => {
    const activeStartDate = new Date(2017, 0, 1);
    const tileClassName = 'testClassName';
    const component = mount(
      <MonthView
        activeStartDate={activeStartDate}
        showNeighboringMonth={false}
        tileClassName={tileClassName}
      />
    );

    const firstDayTile = component.find('.react-calendar__tile').first();
    const firstDayTileClassName = firstDayTile.prop('className');

    expect(firstDayTileClassName.includes(tileClassName)).toBe(true);
  });

  it('applies tileClassName to its tiles conditionally when given a function that returns a string', () => {
    const activeStartDate = new Date(2017, 0, 1);
    const tileClassNameFn = ({ date }) => {
      if (date.getTime() === activeStartDate.getTime()) {
        return 'firstDayOfTheMonth';
      }

      return null;
    };
    const component = mount(
      <MonthView
        activeStartDate={activeStartDate}
        showNeighboringMonth={false}
        tileClassName={tileClassNameFn}
      />
    );

    const tiles = component.find('.react-calendar__tile');

    const firstDayTile = tiles.first();
    const firstDayTileClassName = firstDayTile.prop('className');
    const secondDayTile = tiles.at(1);
    const secondDayTileClassName = secondDayTile.prop('className');

    expect(firstDayTileClassName.includes('firstDayOfTheMonth')).toBe(true);
    expect(secondDayTileClassName.includes('firstDayOfTheMonth')).toBe(false);
  });

  it('renders tileContent in its tiles when given a node', () => {
    const activeStartDate = new Date(2017, 0, 1);
    const tileContent = (
      <div className="testContent" />
    );
    const component = mount(
      <MonthView
        activeStartDate={activeStartDate}
        showNeighboringMonth={false}
        tileContent={tileContent}
      />
    );

    const tiles = component.find('.react-calendar__tile');

    const firstDayTile = tiles.first();
    const firstDayTileContent = firstDayTile.find('.testContent');

    expect(firstDayTileContent).toHaveLength(1);
  });

  it('renders tileContent in its tiles conditionally when given a function that returns a node', () => {
    const activeStartDate = new Date(2017, 0, 1);
    const tileContentFn = ({ date }) => {
      if (date.getTime() === activeStartDate.getTime()) {
        return (
          <div className="testContent" />
        );
      }

      return null;
    };

    const component = mount(
      <MonthView
        activeStartDate={activeStartDate}
        showNeighboringMonth={false}
        tileContent={tileContentFn}
      />
    );

    const tiles = component.find('.react-calendar__tile');

    const firstDayTile = tiles.first();
    const firstDayTileContent = firstDayTile.find('.testContent');
    const secondDayTile = tiles.at(1);
    const secondDayTileContent = secondDayTile.find('.testContent');

    expect(firstDayTileContent).toHaveLength(1);
    expect(secondDayTileContent).toHaveLength(0);
  });

  it('does not render WeekNumbers component by default', () => {
    const activeStartDate = new Date(2017, 0, 1);

    const component = mount(
      <MonthView activeStartDate={activeStartDate} />
    );

    expect(component.find('WeekNumbers')).toHaveLength(0);
  });

  it('renders WeekNumbers component by given showWeekNumbers flag', () => {
    const activeStartDate = new Date(2017, 0, 1);

    const component = mount(
      <MonthView
        activeStartDate={activeStartDate}
        showWeekNumbers
      />
    );

    expect(component.find('WeekNumbers')).toHaveLength(1);
  });
});
