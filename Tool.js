import * as React from 'react';
import { IconButton } from '@storybook/components';

import * as C from "./constants";

import CookieJar from "./_$cookies";

import Sun from './icons/Sun';
import Moon from './icons/Moon';

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');


export const ColorSwap = ({sb}) => {
    let currMode, isDark, preferredSchemeOnInitiation;;

    const availInCookie = CookieJar.check(C.COOKIE_NAME);

    const storeCurrentChoice = (choice) => {
        CookieJar.set(C.COOKIE_NAME, choice, 60);
    }

    if (availInCookie) {
        preferredSchemeOnInitiation = CookieJar.get(C.COOKIE_NAME);
    } else {
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            preferredSchemeOnInitiation = "dark";
        } else {
            preferredSchemeOnInitiation = "light";
        }
    }

    if (preferredSchemeOnInitiation.toLowerCase() === "dark") {
        currMode = "dark";
        isDark = true;
    } else {
        currMode = "light"
        isDark = false;
    }

    if(!availInCookie){
        storeCurrentChoice(preferredSchemeOnInitiation);
    };

    sb.getChannel().emit(C.CHANNEL_NAME, currMode);

    const changeScene = (e) => {
        currMode = CookieJar.get(C.COOKIE_NAME);

        if(currMode == 'dark'){
            currMode = 'light';
            isDark = false;
        } else {
            currMode = 'dark';
            isDark = true;
        }

        storeCurrentChoice(currMode);
        sb.getChannel().emit(C.CHANNEL_NAME, currMode);
    }

    return (
        <IconButton
          key="scheme-change"
          active={isDark}
          title={
            isDark ? 'Change theme to light mode' : 'Change theme to dark mode'
          }
          onClick={changeScene}
        >
          {isDark ? <Sun /> : <Moon />}
        </IconButton>
      );
}

export default ColorSwap;
