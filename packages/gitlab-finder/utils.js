/* eslint-disable unicorn/no-array-for-each */
/* eslint-disable unicorn/no-array-method-this-argument */
/* eslint-disable unicorn/no-array-callback-reference */
import fs from 'node:fs/promises'
import path from 'node:path'
import { inspect } from 'node:util'

import j from 'jscodeshift'
/**
 * Check if there is an inner call to a specified symbol in the given source.
 *
 * @param {import('jscodeshift').Collection<any>} source
 * @param {string} symbol - the symbol to search for
 * @return {boolean} true if there is an inner call to the symbol, false otherwise
 */
export function checkInnerCall(source, symbol) {
  let innerCall = false
  // = A()
  source
    .find(j.CallExpression, {
      callee: {
        name: symbol,
      },
    })
    .forEach(() => {
      if (!innerCall) innerCall = true
    })
  // = new A()
  source
    .find(j.NewExpression, {
      callee: {
        name: symbol,
      },
    })
    .forEach(() => {
      if (!innerCall) innerCall = true
    })
  // { A: A }
  source
    .find(j.Property, {
      value: {
        name: symbol,
      },
    })
    .forEach(() => {
      if (!innerCall) innerCall = true
    })
  // A = A
  source
    .find(j.AssignmentExpression, {
      right: {
        name: symbol,
      },
    })
    .forEach(() => {
      if (!innerCall) innerCall = true
    })
  // A + ''
  source
    .find(j.BinaryExpression, {
      left: { name: symbol },
    })
    .forEach(() => {
      if (!innerCall) innerCall = true
    })
  source
    .find(j.BinaryExpression, {
      right: { name: symbol },
    })
    .forEach(() => {
      if (!innerCall) innerCall = true
    })
  // `${A}`
  source.find(j.TemplateLiteral).forEach(p => {
    for (const e of p.node.expressions) {
      if (e.name === symbol) innerCall = true
    }
  })

  // A={A}
  source
    .find(j.JSXExpressionContainer, {
      expression: { name: symbol },
    })
    .forEach(() => {
      if (!innerCall) innerCall = true
    })
  // ...A
  source
    .find(j.MemberExpression, {
      object: { name: symbol },
    })
    .forEach(() => {
      if (!innerCall) innerCall = true
    })

  // <A />
  source.find(j.JSXElement, { openingElement: { name: { name: symbol } } }).forEach(() => {
    if (!innerCall) innerCall = true
  })

  return innerCall
}

/**
 * Asynchronously traverses a record and calls a callback function for each file and symbol.
 * @callback CB
 * @param {Object} info
 * @param {import('jscodeshift').Collection<any>} info.source
 * @param {string} info.filePath
 * @param {string} info.symbol
 */

/**
 * @param {Object} record - The record object to traverse.
 * @param {CB} callback
 * @return {Promise<void>} - A promise that resolves when traversing is complete.
 */
export async function traverse(record, callback) {
  for (const file of Object.keys(record)) {
    for (const { filePath, symbol } of Object.values(record[file])) {
      const source = await getFileSource(filePath)
      try {
        // eslint-disable-next-line n/no-callback-literal
        await callback({ filePath, source, symbol })
      } catch (error) {
        console.log('file error', inspect(record[file], false, null, true), inspect(error))
      }
    }
  }
}

export async function getFileSource(filePath) {
  const content = await fs.readFile(path.resolve(filePath), {
    encoding: 'utf8',
  })
  let parser = j
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    parser = j.withParser('tsx')
  }
  const source = parser(content)
  return source
}
