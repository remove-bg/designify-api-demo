# Batch processing example

## What this demo is doing:

This example shows how to use the Designify API to batch process a set of images. The code inside `index.js` is iterating through all images put inside `./input-images` and sending them one by one to the Designify API. The generated designs are then placed inside the `./output-images` folder.

## How to run this demo:

1. Install all the dependecies

```
npm install
```

2. Get your [API key](https://www.designify.com/dashbaord) and place it inside the `index.js` file
3. Run the example through

```
npm start
```
