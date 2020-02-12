# tr-det-react
React component for TR Data Extraction Tool

<!-- ##### Run the project
_npm start_

##### Create optimized build
_npm run build_ -->

### Running The Project

You must have npm installed on your system. From the root project directory run these commands from the command line:

_npm install_

This will install all dependencies. (refer package.json for dependencies)

To build the project, first run this command:

_npm start_

This will perform an initial build and start a watcher process that will update bundle.js with any changes you wish to make. (This will start to compile and reflect the change just after saving the file)


### Deployment (Create optimized build)

For Creating an optimized production build run following command:

_npm run build_

this command will creates a build directory with a production build of the app.
Inside the build/static directory will be your JavaScript and CSS files. Each filename inside of build/static will contain a unique hash of the file contents. This hash in the file name enables long term caching techniques.