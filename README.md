## rrdelaney.github.io

[![Build Status](https://travis-ci.org/rrdelaney/rrdelaney.github.io.svg?branch=develop)](https://travis-ci.org/rrdelaney/rrdelaney.github.io)

Hosts the source for http://ryandelaney.io

## Building

To build for production run

```
grunt package
```

this will generate a single index.html
file in the project root that can be
used standalone for the website.

## Config file

#### Dependencies

- `dependencies.js` The javascript dependencies

#### Paths

- `path.src` Path for the site source
- `path.target` Path to the build
- `path.package` Path to the packaged site
- `path.resrc` Where the project resources are
- `path.img` Where the project images live in the resource directory
