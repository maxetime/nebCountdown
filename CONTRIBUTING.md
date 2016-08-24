## Issues

- Report issues or feature requests on [GitHub Issues](https://github.com/maxetime/nebCountdown/issues).

## Pull requests
- Create a new topic branch for every separate change you make.
- Make sure the build runs successfully.

## Development

### Tools
We use the following tools for development:

- [NodeJS](http://nodejs.org/download/) required to run gulp.
- [Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) for task management.

### Getting started
Install [NodeJS](http://nodejs.org/).  
Install globally gulp-cli using the following command:

    $ npm install -g gulp-cli

Browse to the project root directory and install the dev dependencies:

    $ npm install -d

To execute the build run the following command in the root of the project:

    $ gulp

### Automatic build
You can build automatically after a file change using the following command:

    $ gulp watch
