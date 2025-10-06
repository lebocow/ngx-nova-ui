interface PlaywrightLikePage {
  waitForLoadState: (state?: 'domcontentloaded' | 'load' | 'networkidle', opts?: { timeout?: number }) => Promise<void>;
  waitForFunction: (
    pageFunction: (arg?: unknown) => unknown,
    arg?: unknown,
    opts?: { timeout?: number },
  ) => Promise<unknown>;
  evaluate: <T>(fn: () => Promise<T> | T) => Promise<T>;
}

export async function waitForPageReady(page: PlaywrightLikePage, options?: { timeoutMs?: number }): Promise<void> {
  const timeout = options?.timeoutMs ?? 5000;
  await page.waitForLoadState('domcontentloaded', { timeout }).catch((error: Error): void => {
    console.warn('Failed to wait for DOM content loaded:', error.message);
  });
  await page.waitForLoadState('load', { timeout }).catch((error: Error): void => {
    console.warn('Failed to wait for load state:', error.message);
  });
  await page
    .waitForFunction(() => document.readyState === 'complete', undefined, { timeout })
    .catch((error: Error): void => {
      console.warn('Failed to wait for document ready state:', error.message);
    });
  await page
    .waitForFunction(
      () =>
        'fonts' in document
          ? (document as unknown as Document & { fonts: FontFaceSet }).fonts.status === 'loaded'
          : true,
      undefined,
      { timeout },
    )
    .catch((error: Error): void => {
      console.warn('Failed to wait for fonts loaded:', error.message);
    });
  // Final rAF pair to flush layout/paint without arbitrary sleep
  await page
    .evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))))
    .catch((error: Error): void => {
      console.warn('Failed to execute animation frame flush:', error.message);
    });
}
