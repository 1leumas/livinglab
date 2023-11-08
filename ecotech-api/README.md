# Eco Tech API

This is the backend for Eco Tech, providing RESTful API endpoints for data retrieval. It is built with TypeScript, Node.js, Express, and connects to a PostgreSQL database.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them:

- `npm or yarn`

## Installing

A step by step series of examples that tell you how to get a development environment running:

### 1. Clone the repository:
```bash
git clone https://github.com/1leumas/livinglab.git
```

### 2. Install dependencies:
```bash
npm install
```
or if you are using yarn:
```bash
yarn install
```
### 3. Set up the environment variables:

Copy the .env.example file to a new file named .env and fill it with your environment variables.

### 4. Build the TypeScript project:
```bash
npm run build
```
or with yarn:
```bash
yarn build
```
### 5. Run the server
```bash
npm run start
```
or with yarn:
```bash
yarn start
```
The server should now be running on http://localhost:5000.

## API Documentation

Below is a list of available API endpoints with their respective functionalities:

### General Routes

- `GET /api/status`
  - Description: Checks the status of the database connection.
  - Response: `{ status: "success", message: "Connected to the database successfully." }`

- `GET /api/tables`
  - Description: Lists all the tables in the database.
  - Response: `{ status: "success", tables: ["table1", "table2", ...] }`

### Data Retrieval Routes

- `GET /api/aeroporto` and `GET /api/cruzeiro`
  - Description: Retrieves weather data for the airport station.
  - Query Parameters:
    - `time_range`: Filter data by time range (e.g., 'lastDay', 'lastWeek').
    - `interval`: Data interval (e.g., '1h' for hourly data).
  - Response: `{ status: "success", data: [...] }`

- `GET /api/particulas`
  - Description: Retrieves particle data from the specified device.
    - Query Parameters:
    - `time_range`: Filter data by time range (e.g., 'lastDay', 'lastWeek').
    - `interval`: Data interval (e.g., '1h' for hourly data).
  - Response: `{ status: "success", data: [...] }`

  - `GET /api/latest`
  - Description: Retrieves the latest particle data.
  - Response: `{ status: "success", data: [...] }`

### Other Routes for Testing Purposes

- `GET /api/columns/:table_name`
  - Description: Retrieves a list of column names for a specified table in the database.
  - URL Parameters:
    - `table_name`: The name of the table whose columns you want to retrieve.
  - Response: `{ status: "success", columns: ["column1", "column2", ...] }`

- `GET /api/data/:table_name`
  - Description: Retrieves all data from a specified table in the database.
  - URL Parameters:
    - `table_name`: The name of the table from which you want to retrieve data.
  - Response: `{ status: "success", data: [{...}, {...}, ...] }`


## Built With

- [TypeScript](https://www.typescriptlang.org/) - The language used
- [Node.js](https://nodejs.org/) - The runtime environment
- [Express](https://expressjs.com/) - The web framework
- [PostgreSQL](https://www.postgresql.org/) - The database system
- [Moment.js](https://momentjs.com/) - Date manipulation library

## Dependencies

- `cors` for setting up Cross-Origin Resource Sharing
- `dotenv` for managing environment variables
- `express` as the web server framework
- `moment` for date and time manipulation
- `pg` for interfacing with PostgreSQL databases

## Dev Dependencies

- `@types/*` for TypeScript type definitions
- `tsup` for building and bundling the TypeScript project
- `tsx` for executing TypeScript files as scripts
- `typescript` for the TypeScript compiler

## Versioning

We use Git for version control. For the versions available, see the [commits on this repository](https://github.com/1leumas/livinglab/commits/).

## Authors

- Samuel - Initial work - [1leumas](https://github.com/1leumas)

See also the list of [contributors](https://github.com/1leumas/livinglab/contributors) who participated in this project.
