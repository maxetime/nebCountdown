# nebCountdown
A simple countdown jQuery plugin

## Basic Usage

Markup attributes

* **data-enddate** : Set the end date for the countdown. Add to the element where the plugin is applied.
* **data-format** : Set the format for the current element has to be the element or a children. The innerhtml while be replaced.

Options

* **interval** : The interval to update in milliseconds
* **debug** : Output debug messages to console

Formats

    d : days
    dd : days with leading zero
    h : hours
    hh : hours with leading zero
    m : minutes
    mm : minutes with leading zero
    s : seconds
    ss : seconds with leading zero
    u : milliseconds
    uu : milliseconds with leading zero

## Contributing

Check out the [Contributing Guidelines](CONTRIBUTING.md)

## Manual release steps

* Increment the "version" attribute of `package.json`
* Increment the version number in the `src/nebCountdown.js` file
* Commit with the message "Release version x.x.x"
* Create version tag in git

## Authors

* [Maxime Myers](https://github.com/maxetime)
