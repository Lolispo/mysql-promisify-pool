# mysql-promisify-pool
A npm module that wraps the [mysql](https://www.npmjs.com/package/mysql) package in JavaScript (TypeScript) and allows asynchrouns interaction through async/await.

The package also utilizes the getConnection of the mysql.Pool element to utilize existing connections if they exist.

## Requirements

To use the package, database connection details should be loaded in through environment variables.

The variables required are: 

```
DB_HOST=<database-endpoint>
DB_USER=<database-user>
DB_PW=<database-password>
DB_NAME=<database-name>
```

An example loading environment variables using the package [dotenv](https://www.npmjs.com/package/dotenv)

```
import * as dotenv from "dotenv";
dotenv.config(); 

```

## Usage

Usage of the query follows the standards of package [mysql](https://www.npmjs.com/package/mysql).

```
const pool = require('mysql-promisify-pool');

export const fetchTable = async (table?: string) => {
  const sql = 'SELECT * FROM Table';
  const result = await pool.query(sql);
  // Handle result
  return result;
}
```


