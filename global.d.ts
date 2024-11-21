// global.d.ts
declare global {
    // Extending the NodeJS.Global type to include _mongoClientPromise
    var _mongoClientPromise: Promise<MongoClient> | undefined
  }
  
  export {}
  