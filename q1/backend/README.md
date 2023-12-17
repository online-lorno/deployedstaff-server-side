# Backend Server

This project is a backend server for an application that shows a list of toys from 3rd party suppliers. It uses Express and TypeScript.

## Getting Started

To get started, clone the repository and install the dependencies.

```bash
git clone https://github.com/your-repo/backend-server.git
cd backend-server
npm install
```

## Running the Server

To start the server, use the following command:

```bash
npm start
```

The server will start on `http://localhost:3000`.

## Project Structure

The project is structured as follows:

- `src/app.ts`: Main entry point of the application. Sets up the Express server and middleware, and includes the routes.
- `src/controllers/toysController.ts`: Contains methods for handling API requests related to toys.
- `src/routes/toysRoutes.ts`: Sets up the routes for the toy APIs.
- `src/services/`: Contains classes for fetching data from the respective supplier's API.
- `src/types/toys.d.ts`: Contains TypeScript interfaces for the toy data.
- `src/utils/dataNormalizer.ts`: Contains a function for normalizing and standardizing the data from different supplier APIs to a common format.

## Testing

To run tests, use the following command:

```bash
npm test
```

## Building

To build the project, use the following command:

```bash
npm run build
```

This will compile the TypeScript code and output it to the `dist` directory.

## Contributing

Please read `CONTRIBUTING.md` for details on our code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the `LICENSE.md` file for details.