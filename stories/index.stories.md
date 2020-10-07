```js script
import { html } from '@open-wc/demoing-storybook';
import '../dist/radial-loader.js';

export default {
  title: 'RadialLoader',
  component: 'radial-loader',
  options: { selectedPanel: "storybookjs/knobs/panel" },
};
```

# RadialLoader

A component for...

## Features:

- a
- b
- ...

## How to use

### Installation

```bash
yarn add radial-loader
```

```js
import 'radial-loader/radial-loader.js';
```

```js preview-story
export const Simple = () => html`
  <radial-loader percentComplete="60"></radial-loader>
`;
```
