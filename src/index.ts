import { DotenvParseOutput, parse } from "dotenv"
import { accessSync, readFileSync, constants } from "fs"

function loadEnv(fileName: string): DotenvParseOutput {
  return validateFileExistsSync(fileName) ? parse(readFileSync(fileName)) : {}
}

function validateFileExistsSync(fileName: string): boolean {
  try {
    accessSync(fileName, constants.F_OK)
  } catch (e) {
    return false
  }
  return true
}

export function envsLoader(...envs: string[]) {
  envs.forEach((env, index) => {
    const parsedEnv = loadEnv(env)
    // load keys to the process object
    Object.keys(parsedEnv).forEach(key => {
      if (!process.env[key]) {
        process.env[key] = parsedEnv[key]
      }
  })
})
}