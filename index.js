import addons from '@storybook/addons';

import * as C from "./constants";

export function schemeToggler(scheme) {
        const P = document.documentElement;
        P.setAttribute(C.ATTR_NAME, scheme);
        this.off(C.CHANNEL_NAME, this);
}

export * from "./constants";
