<meta
    title="Deploying to NPM with TravisCI"
    date="8/17/2015"
    tags="npm,deploy,travis"
    img="/img/blog/npm-deploy-screenshot.png"
>

### Introduction

I've been writing a linter for the Jade templating language called
[Jadelint](https://github.com/rrdelaney/jadelint), and over the course of a few
short weeks I've had a little more than a dozen feature requests. To keep up
with the building of the project, I've been using TravisCI for builds and
updating the [documentation](http://rdel.io/jadelint). Until recently, I've been
deploying to NPM myself due to a laziness to tag my git commits on releases.
I figured out a script to automate this deployment though, and publish my build
targets to NPM on a version update in `package.json`.

### Tracking Version Updates

To tell when the version is changed, you need to compare the local version and
the version on the NPM registry. Getting the local version can be done with a
simple

```bash
node -p "require('./package.json').version"
```

Using `node -p "..."` will evaluate the script in the quotes and print the
result. Requiring the version info is a simple step from there. Next, getting
the NPM info can be done with

```bash
npm view $PACKAGE_NAME dist-tags.latest
```

This prints the latest version known on NPM.

### The Travis File

You can specify a custom condition in your `.travis.yml` for deployment, and
putting the two previous commands together, you end up with

```yaml
deploy:
    provider: npm
    email: ...
    api_key: ...
    skip_cleanup: true
    on:
        branch: master
        condition: $(npm view jadelint dist-tags.latest) != \
                   $(node -p "require('./package.json').version")
```
