/** @type {import('@storybook/test-runner').TestRunnerConfig} */
const { toMatchImageSnapshot } = require('jest-image-snapshot');
const { injectAxe, checkA11y } = require('axe-playwright');

expect.extend({ toMatchImageSnapshot });

const config = {
  async preRender(page) {
    await injectAxe(page);
  },
  async postRender(page, context) {
    await checkA11y(page, '#storybook-root', {
      detailedReport: true,
      detailedReportOptions: { html: true },
    });

    const image = await page.screenshot({ animations: 'disabled' });
    expect(image).toMatchImageSnapshot({
      customSnapshotIdentifier: context && context.id ? context.id : undefined,
      failureThreshold: 0.01,
      failureThresholdType: 'percent',
    });
  },
};

module.exports = config;
