import { filterCollectionsBySearch } from './helpers';

const collections = [{ name: 'Море (июнь)' }, { name: 'Поход в горы' }, { name: 'Горный Алтай' }];

test('returns all collections for an empty query', () => {
  expect(filterCollectionsBySearch(collections, '')).toBe(collections);
});

test('matches by substring ignoring case', () => {
  expect(filterCollectionsBySearch(collections, 'ГОР').map((c) => c.name)).toEqual([
    'Поход в горы',
    'Горный Алтай',
  ]);
});

test('returns an empty list when nothing matches', () => {
  expect(filterCollectionsBySearch(collections, 'пустыня')).toEqual([]);
});
