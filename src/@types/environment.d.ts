declare global {
    namespace NodeJS {
      interface ProcessEnv {
        DATABASE_URL: string
        CLIENT_ID: string
        GUILD_ID: string
        TOKEN: string
      }
    }
  }
  
  // If this file has no import/export statements (i.e. is a script)
  // convert it into a module by adding an empty export statement.
  export {}