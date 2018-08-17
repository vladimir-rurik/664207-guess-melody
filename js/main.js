'use strict';

const RIGHT_ARROW = 37;
const LEFT_ARROW = 39;
/**
 * Screen names in the show order.
 */
const SCREEN_ORDER_BY_ELEMENT_ID = [
  `welcome`,
  `game-artist`,
  `game-genre`
];

const mainElement = document.querySelector(`.main`);
const appElement = document.querySelector(`main.app`);
const elementScreenArrows = document.createElement(`div`);

/**
 * Function to put a DOM element of a screen into the main section to show it then.
 * @param {DOM-Object} element - a DOM element of a screen
 */
const selectSlide = (element) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(element.cloneNode(true));
};

/**
 * Filter to return only necessary screens from the templates
 * @param {DOM-Object} element - a DOM element of a screen
 * @return {boolean} - whether or not in the showing screen array
 */
const filterById = (element) => {
  if (SCREEN_ORDER_BY_ELEMENT_ID.indexOf(element.id) >= 0) {
    return true;
  }
  return false;
};

/**
 * Array of all possible screens
 */
const screens = Array.from(document.querySelectorAll(`template`))
  .filter(filterById)
  .sort((a, b) => {
    return SCREEN_ORDER_BY_ELEMENT_ID.indexOf(a) - SCREEN_ORDER_BY_ELEMENT_ID.indexOf(b);
  })
  .map((it) => it.content);

let current = 0;
/**
 * Function to select a screen by its index
 * @param {number} index - index of a screen
 */
const select = (index) => {
  index = index < 0 ? screens.length - 1 : index;
  index = index >= screens.length ? 0 : index;
  current = index;
  selectSlide(screens[current]);
};

document.addEventListener(`keydown`, (evt) => {
  switch (evt.keyCode) {
    case RIGHT_ARROW:
      select(current + 1);
      break;
    case LEFT_ARROW:
      select(current - 1);
      break;
  }
});

/**
 * DOM element of the navigation arrows.
 */
elementScreenArrows.innerHTML = `<div class="arrows__wrap">
  <style>
    .arrows__wrap {
      position: absolute;
      top: 135px;
      left: 50%;
      margin-left: -56px;
    }
    .arrows__btn {
      background: antiquewhite;
      border: 2px solid black;
      padding: 5px 20px;
    }
  </style>
  <button id="arrow_btn_left" class="arrows__btn"><-</button>
  <button id="arrow_btn_right" class="arrows__btn">-></button>
</div>`;

appElement.appendChild(elementScreenArrows);

const arrowBtnLeftElement = document.getElementById(`arrow_btn_left`);
const arrowBtnRightElement = document.getElementById(`arrow_btn_right`);

arrowBtnLeftElement.addEventListener(`click`, () => {
  select(current + 1);
});

arrowBtnRightElement.addEventListener(`click`, () => {
  select(current - 1);
});

select(0);
