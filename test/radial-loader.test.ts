import { html, fixture, expect } from '@open-wc/testing';

import {RadialLoader} from '../src/RadialLoader.js';
import '../radial-loader.js';

describe('RadialLoader', () => {
  it('passes the a11y audit', async () => {
    const el: RadialLoader = await fixture(html`
      <radial-loader></radial-loader>
    `);

    await expect(el).shadowDom.to.be.accessible();
  });
});
