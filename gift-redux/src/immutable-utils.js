/**
 * Adds an item to a list so the elements remain in sorted order.
 */
export function addToSortedList(list, item) {
  // Find index where item should be inserted.
  const index = list.findIndex(element => element > item);
  // Return new List with item inserted before that index,
  // or at the end if no element greater than item was found.
  return index === -1 ? list.push(item) : list.insert(index, item);
}

/**
 * Deletes an item from a list.
 */
export function deleteFromList(list, item) {
  return list.delete(list.findIndex(element => element === item));
}
