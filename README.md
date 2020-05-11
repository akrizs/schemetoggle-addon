## Not A Production Ready package!!
This package is mostly to learn to write a toolbar plugin for Storybook 6.

It simply creates and attaches to some keyboard events and toolbar icon click to change an attribute in the Preview html tag, making it easy to toggle between color schemes (dark/light) using CSS variables assigned to `:root` and `colorscheme="dark"`

I write vuejs components, feel free to pull and push and fork and do whatever you like if you want to create your own or just fiddle around with this one...

### Happy days!

At the moment im triggering the events like this
###### preview.js
```javascript
import {schemeToggler, CHANNEL_NAME} from "./schemeToggle-addon";

const ch = addons.getChannel()
ch.on(CHANNEL_NAME, schemeToggler.bind(ch))
```
