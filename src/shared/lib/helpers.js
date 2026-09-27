/**
 * Фильтрует коллекции по названию без учёта регистра
 * @param {Array<{name: string}>} collections
 * @param {string} searchValue
 * @returns {Array<{name: string}>}
 */
export const filterCollectionsBySearch = (collections, searchValue) => {
  if (!searchValue) return collections;
  const query = searchValue.toLowerCase();
  return collections.filter((collection) => collection.name.toLowerCase().includes(query));
};
