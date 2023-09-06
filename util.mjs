import axios from 'axios';
import curlirize from 'axios-curlirize';
 
// initializing axios-curlirize with your axios instance

export function axiosInstance(config) {
  const instance =  axios.create(config)
  instance.interceptors.response.use(response => {
    let scrubbedCommand = response.config.curlCommand.replace(/Authorization:Basic [^"]*/, 'Authorization:Basic $(cat .github_auth | base64)')
    console.log(`HTTP ${response.status}: ${scrubbedCommand}`)
    return response
  }, err => {
    if (err.response && err.response.config && err.response.config.curlCommand) {
      let scrubbedCommand = err.response.config.curlCommand.replace(/Authorization:Basic [^"]*/, 'Authorization:Basic $(cat .github_auth | base64)')
      console.error(`HTTP ${err.response.status}: ${scrubbedCommand}`)
    }
    return Promise.reject(err)
  })
  curlirize(instance, (result, err) => {})
  return instance
}

export function trimSourceUrl(sourceUrl) {
  let result = sourceUrl.replace(/.*https\:\/\/github\.skillsoft\.com\//, '')
  result = result.replace(/.*git\@github\.skillsoft\.com:/, '')
  result = result.replace(/.git$/, '')
  return result
}

export function parseOrgAndRepo(sourceUrl) {
  const orgRepoExpression = trimSourceUrl(sourceUrl)
  const splitExpression = orgRepoExpression.split('/')
  return {
    org: splitExpression[0],
    repo: splitExpression[1]
  }
}

export function parseOrgAndTeam(sourceUrl) {
  const match = sourceUrl.match(/.*orgs\/([^\/]*)\/teams\/(.*)/)
  return {org: match[1], team: match[2]}
}