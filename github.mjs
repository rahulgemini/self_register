import {axiosInstance} from './util.mjs'
import {readFileSync} from 'fs'
import { parseOrgAndRepo } from './util.mjs'
import { parseOrgAndTeam } from './util.mjs'

//const auth = readFileSync('.github_auth')
const baseApi = 'https://github.skillsoft.com/api/v3'
/*const axios = axiosInstance({
  baseURL: baseApi,
  headers: {
    'Authorization': `Basic ${Buffer.from(auth).toString('base64')}`
  }
})*/

let axios;
const axios1 = axiosInstance({
  baseURL: baseApi,
  headers: {
    'Authorization': `Bearer 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`
  }
})

export  function initiateAxiosInstance(key) {
  axios=axiosInstance({
  baseURL: baseApi,
  headers: {
    'Authorization': `Bearer `+key
  }
});
}

export async function verifyAuth() {
  return !!auth
}

export async function verifyConnection() {
  const {status} = await axios.get()
  return true
}

export async function fetchRepoSummary(repoUri) {
  const {org, repo} = parseOrgAndRepo(repoUri)
  const {status, data} = await axios.get(`${org}/${repo}`)

}

export async function addUserToTeam(username, teamUri) {
console.log("add user to team");
  const {org, team} = parseOrgAndTeam(teamUri)
  try {
    const {data} = await axios.put(`orgs/${org}/teams/${team}/memberships/${username}`)
    console.log(JSON.stringify(data, null, 2))
  } catch (err) {
    console.log(JSON.stringify(err.response.data))
    process.exit(1)
  }
}