
import addons, { types } from '@storybook/addons';
import * as React from 'react';

import Tool from './Tool';

addons.register('cardholdings/schemeToggle-addon', sb => {
  addons.add('cardholdings/schemeToggle-addon', {
    title: 'Toggle Color Scheme',
    type: types.TOOL,
    match: ({ viewMode }) => viewMode === 'story' || viewMode === 'docs',
    render: () => <Tool sb={sb} />
  });
});
