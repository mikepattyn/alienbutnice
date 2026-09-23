import axe from 'axe-core';

export async function expectNoAxeViolations(root: HTMLElement): Promise<void> {
  document.body.appendChild(root);
  const results = await axe.run(root, {
    rules: {
      'color-contrast': { enabled: false },
    },
  });
  expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
}
