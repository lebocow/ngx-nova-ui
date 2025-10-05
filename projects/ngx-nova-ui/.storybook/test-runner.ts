import * as fs from 'node:fs';
import * as path from 'node:path';
import type { TestRunnerConfig } from '@storybook/test-runner';
import { injectAxe, checkA11y } from 'axe-playwright';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

const SNAPSHOT_DIR = path.join(process.cwd(), 'projects/ngx-nova-ui/__image_snapshots__');

const config: TestRunnerConfig = {
  setup() {
    expect.extend({ toMatchImageSnapshot });
  },
  async preVisit(page) {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 960, height: 480 });
    await injectAxe(page);
  },
  async postVisit(page, context) {
    await checkA11y(page, '#storybook-root', {
      detailedReport: true,
      detailedReportOptions: { html: true },
    });

    await page.waitForLoadState('domcontentloaded');
    await page.waitForSelector('#storybook-root', { state: 'visible', timeout: 5000 });
    await page.evaluate(async () => {
      if ('fonts' in document) {
        await (document as Document & { fonts: FontFaceSet }).fonts.ready;
      }
      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      });
    });
    await page.waitForTimeout(50);
    const id = context?.id ?? 'unknown';
    const updateSnapshots = process.env.UPDATE_STORYBOOK_SNAPSHOTS === '1';
    const snapshotPath = path.join(SNAPSHOT_DIR, `${id}.png`);

    if (!updateSnapshots && !fs.existsSync(snapshotPath)) {
      throw new Error(`Missing baseline snapshot for "${id}". Run: npm run test:stories:update`);
    }

    if (updateSnapshots && !fs.existsSync(SNAPSHOT_DIR)) {
      fs.mkdirSync(SNAPSHOT_DIR, { recursive: true });
    }

    const image = await page.screenshot({ animations: 'disabled' });

    expect(image).toMatchImageSnapshot({
      customSnapshotIdentifier: id,
      customSnapshotsDir: 'projects/ngx-nova-ui/__image_snapshots__',
      failureThreshold: 0.01,
      failureThresholdType: 'percent',
      updatePassedSnapshot: updateSnapshots,
    });
  },
};

export default config;
