# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


## Task details:
In this frontend test, you will implement a one page app in React from a basic wireframe.

The wireframe should be perceived as a concept and not a finalised design. You are free to either mimic it completely or add your own visual improvements according to your own taste. Ideally the UI should also be responsive when shown on a mobile device, so you may need to do some changes in the design according to your preferences there.

The functionality of the app is to list countries that are fetched from a public API. The countries are categorised in regions, and when you click on a region you display all the corresponding countries, structured in columns. If you click on a country, that country will be highlighted. You can highlight multiple countries at the same time.

For the implementation, please use https://stackblitz.com/ and create a new React project and use the default template. When you are finished, just send us the link to your project. If you want to use any external dependencies, you can just enter a package name in the left field menu.

For fetching country data, use https://restcountries.eu/rest/v2/all

The color code of the pink color in the design is #e3127e, you are encouraged to use that as well!

The for the Utopia Logo for the avatar, you can use https://utopiamusic.com/logo.


## Notes:
1. User can select/unselect Region and Country.
2. If no Region selected, "No region selected" message will be displyed below region cards.
3. If region is selected, list of all the corresponding countries will be displyed.
4. On click of Country, it will be highlighted.
5. When changing Region selection, component will be re-rendered and it will clear previously (if any) selected corresponding countries. If you want to prevent re-rendering and memoize selected countries on Region change, check comment in Countries.tsx line 21 (useEffect hook).
6. Country count is displyed above list of countries with Region.
7. Mobile device support upto min width '320px'. Also supports tablet view both landscape and portrait.
8. Supports Chrome and Firefox browers.
9. Country list can also be displayed as a flex layout instead of columns (check comments in "Countries.css" .container and .countryTitle class).