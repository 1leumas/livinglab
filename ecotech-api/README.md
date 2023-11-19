# Eco Tech API

This is the backend for Eco Tech, providing RESTful API endpoints for data retrieval. It is built with Node.js, Express, and connects to a PostgreSQL database.

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

### Data Retrieval Routes

- `GET /api/aeroporto` and `GET /api/cruzeiro`
  - Description: Retrieves weather data for the airport station.
  - Query Parameters:
    - `time_range`: Filter data by time range (e.g., 'lastDay', 'lastWeek').
    - `interval`: Data interval (e.g., '1h' for hourly data).
  - Response: `{ status: "success", data: [...] }`

- `GET /api/particles`
  - Description: Retrieves particle data from the specified device.
    - Query Parameters:
    - `time_range`: Filter data by time range (e.g., 'lastDay', 'lastWeek').
    - `interval`: Data interval (e.g., '1h' for hourly data).
  - Response: `{ status: "success", data: [...] }`

  - `GET /api/latest`
  - Description: Retrieves the latest particle data.
  - Response: `{ status: "success", data: [...] }`

## Built With

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

## Versioning

We use Git for version control. For the versions available, see the [commits on this repository](https://github.com/1leumas/livinglab/commits/).

## Authors

- Samuel - Initial work - [1leumas](https://github.com/1leumas)

See also the list of [contributors](https://github.com/1leumas/livinglab/contributors) who participated in this project.
