# Student-reviews Frontend

Bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

Formatting (run from frontend root) [**will override**]
```bash
# commit before 
$ make pretty
# review changes
$ git diff 
```

In the project directory, you can run: **use yarn**
- To begin the development, run `npm start` or `yarn start`.
- To create a production bundle, use `npm run build` or `yarn build`.

## Prereq's
- run `npm install` to install deps

## Deploying
```bash
$ docker build . -t schuermannator/ou-reviews
$ docker push schuermannator/ou-reviews:latest
```
