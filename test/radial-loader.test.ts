import { html, fixture, expect } from '@open-wc/testing';
import { RadialLoader } from '../src/RadialLoader.js';

describe('RadialLoader', () => {
  it('outputs the expected dom', async () => {
    const el: RadialLoader = await fixture(html`
      <radial-loader></radial-loader>
    `);

    expect(el).shadowDom.to.equalSnapshot();
  });

  it('passes the a11y audit', async () => {
    const el: RadialLoader = await fixture(html`
      <radial-loader></radial-loader>
    `);

    await expect(el).shadowDom.to.be.accessible();
  });
});
