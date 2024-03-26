/* eslint-disable unicorn/no-array-for-each */
/* eslint-disable unicorn/no-array-method-this-argument */
/* eslint-disable unicorn/no-array-callback-reference */
import fs from 'node:fs/promises'
import path from 'node:path'
import { inspect } from 'node:util'

import j from 'jscodeshift'

import { checkInternalCalls, getFileSource, traverse } from './utils.js'

/**
 * @type {import('knip').Reporter}
 */
export default async function (options) {
  const { classMembers, exports, files, types } = options.issues

  const cleaner = new Cleaner({
    classMembers,
    exports,
    files,
    types,
  })

  await cleaner.autofix()
}

class Cleaner {
  constructor({ classMembers, exports, files, types }) {
    this.files = files
    this.exports = exports
    this.types = types
    this.classMembers = classMembers
  }

  async autofix() {
    await this.filesClean()
    await this.exportsClean()
    await this.classMembersClean()
    await this.typesClean()
  }

  async classMembersClean() {
    await traverse(this.classMembers, async ({ filePath, source, symbol }) => {
      if (['defaultProps', 'getDerivedStateFromError'].includes(symbol)) {
        return
      }
      source.find(j.ClassProperty, { key: { name: symbol } }).remove()
      source.find(j.MethodDefinition, { key: { name: symbol } }).remove()
      const content = source.toSource()

      await fs.writeFile(filePath, content, { encoding: 'utf8' })
    })
  }

  async exportsClean() {
    await traverse(this.exports, async ({ filePath, source, symbol }) => {
      const content = source
        .find(j.ExportNamedDeclaration)
        .forEach(path => {
          // export class A
          if (
            path.node.declaration?.type === 'ClassDeclaration' &&
            path.node.declaration.id.name === symbol
          ) {
            const innerCall = checkInternalCalls(source, symbol)
            if (innerCall) {
              path.replace(path.node.declaration)
            } else {
              path.replace()
            }
          }

          // export function A
          if (
            path.node.declaration?.type === 'FunctionDeclaration' &&
            path.node.declaration.id.name === symbol
          ) {
            const innerCall = checkInternalCalls(source, symbol)

            if (innerCall) {
              path.replace(path.node.declaration)
            } else {
              path.replace()
            }
          }

          // export const A
          if (
            path.node.declaration?.type === 'VariableDeclaration' &&
            path.node.declaration?.declarations[0].id.name === symbol
          ) {
            const innerCall = checkInternalCalls(source, symbol)

            if (innerCall) {
              path.replace(path.node.declaration)
            } else {
              path.replace()
            }
          }

          // export { A }
          if (path.node.specifiers) {
            path.node.specifiers = path.node.specifiers.filter(
              specifier => specifier.exported.name !== symbol,
            )
            if (path.node.specifiers.length === 0 && !path.node.declaration) {
              path.replace()
            }
          }
        })
        .toSource()
      await fs.writeFile(filePath, content, { encoding: 'utf8' })
    })
  }

  async filesClean() {
    for (const file of this.files) {
      const source = await getFileSource(file)
      if (source.find(j.ImportDeclaration, { source: { value: './index.less' } })) {
        await fs.rm(path.resolve(path.dirname(file), './index.less'), { force: true })
      }
      await fs.rm(path.resolve(file), { force: true })
    }
  }

  async typesClean() {}
}
