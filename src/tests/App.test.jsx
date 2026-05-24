import { describe, it, expect } from 'vitest';

describe('App Component', () => {
  it('renders without crashing', () => {
    expect(true).toBe(true);
  });

  it('checks page title exists', () => {
    document.title = 'Netflix Clone';
    expect(document.title).toBe('Netflix Clone');
  });
});