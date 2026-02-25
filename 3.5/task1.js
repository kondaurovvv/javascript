'use strict'

/**
 * Проверяет, является ли переданное значение строго равным `null`.
 *
 * @param {*} potentialNull - Проверяемое значение любого типа.
 *
 * @returns {boolean} `true` если значение строго равно null, иначе `false`.
 */
export function isNull(potentialNull) {
  return potentialNull === null
}

/**
 * Проверяет, является ли переданное значение строго не равным `null`.
 *
 * @param {*} potentialNotNull - Проверяемое значение любого типа.
 *
 * @returns {boolean} `true` если значение строго не равно null, иначе `false`.
 */
export function isNotNull(potentialNotNull) {
  return potentialNotNull !== null
}
