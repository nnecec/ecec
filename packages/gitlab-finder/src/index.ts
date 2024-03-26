import { dirname, relative } from 'node:path'
import { chdir, cwd } from 'node:process'
import { fileURLToPath } from 'node:url'
import got from 'got'

const host = 'https://git.dian.so'

const client = got.extend({
  prefixUrl: host,
  responseType: 'json',
  headers: {
    'PRIVATE-TOKEN': '3UTvUZxU6QyvHpqi4e4c',
  },
})

async function getGroups({ id = 'fed' }: any = {}) {
  return await client.get(`api/v4/groups/${id}`)
}

function searchInProject({ id, scope = 'blobs', search, page }: any) {
  return client.get(`api/v4/projects/${id}/search?scope=${scope}&search=${search}`)
}

const groups = await getGroups()

const projects = groups.body.projects
  .map(({ id, name, archived }) => (archived ? null : { id, name }))
  .filter(Boolean) as { id: number; name: string }[]

const snippets = []

for (const project of projects) {
  const { body } = await searchInProject({ id: project.id, search: '/map/suggestion' })

  for (const item of body) {
    snippets.push({
      project: project.name,
      filename: item.filename,
      data: item.data,
      // link: body,
    })
  }
}
console.log(projects)

console.log(snippets)
