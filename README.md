# [rdel.io](http://rdel.io)

> My personal website

[![CircleCI](https://circleci.com/gh/rrdelaney/rrdelaney.github.io.svg?style=svg)](https://circleci.com/gh/rrdelaney/rrdelaney.github.io)

Uses:
* React
* Glamorous

## Developing

First install dependencies by running:

```
npm install
```

and then start the app with:

```
npm start
```

This will start the app with hot-reloading enabled.

The site is developed with the StandardJS styleguide.
Lint with:

```
npm run lint
```

## Building

There are two steps to creating a production build:
bundling the JS + CSS and minifying, and then prerendering
the site.

To build the JS, run:

```
npm run build
```

To prerender the site, run:

```
npm run prerender
```

## Things I want to do

* Use Yarn
* Switch to Reason
