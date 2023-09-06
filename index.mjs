import { verifyAuth, verifyConnection, addUserToTeam,initiateAxiosInstance } from './github.mjs'

async function perform() {
  /*if (!verifyAuth()) {
    console.warn(`No credentials found in '.github_auth`)
    process.exit(1)
  }*/

  const cliArgs = process.argv.slice(2);
  if (cliArgs.length != 3) {
    console.warn('usage: ./bin/addUserToTeam.mjs <user> <teamUri>')
    process.exit(1)
  }


  initiateAxiosInstance(cliArgs[2])	
  verifyConnection()
  addUserToTeam(cliArgs[0], cliArgs[1])
}

perform()