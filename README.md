# Personal Dashboard

This is a clone of the Google Momentum Browser Extension Dashboard - [Momentum](https://chrome.google.com/webstore/detail/momentum/laookkfknpbbblfpciffpaejjkokdgca?hl=en "Momentum")

Leading up to the build up of the page I worked with various APIs while paying attention to Promise Rejections and Error Handling

Basically, It's the default page that will pop up once a user opens up a new tab on google chrome

Free APIs used in the project are :

- Unsplash photos API
- Crypto currencies API
- Weather API (User has to allow location access for the data to be rendered)
- Random Quotes/Advice API
- Sports API for the EPL Table standings

Try out the [live demo](https://teal-lolly-2f9beb.netlify.app "Personal Dashboard")

## Initial appearance of the page

<img width="100%" alt="personal_dashboard_bg" src="https://user-images.githubusercontent.com/83452606/216811575-8bd716c3-4d51-4c34-b1e0-80f6b7359d42.png">

## After a couple of improvements

<img width="100%" alt="personalDB" src="https://user-images.githubusercontent.com/83452606/226739213-0f73b684-7282-4581-ade9-19c4a31542e5.png">

## Lazy Loading

Used the [lazysizes JS library](https://github.com/aFarkas/lazysizes "read docs") lazy loader CDN

```html
<script src="https://cdn.jsdelivr.net/npm/lazysizes@5.3.2/lazysizes.min.js"></script>
```

This library provides lazy loading functionality for images and other media on a webpage

To enable the lazy loading on the images one needs the `lazyload` class to the images and change the `src` attribute to `data-src`

```html
<img data-src="image.jpg" class="lazyload" />
```

For the background image one adds the `data-bg` attribute which will be uised by the library to lazy load the background image

```js
document.body.style.backgroundImage = `url(${data.urls.regular})`;
document.body.setAttribute("data-bg", "lazyload");
```

### Other Features to add/Caveats :

- Include SameSite cookie attribute
- Placeholder Icons or Spinners
- Responsiveness in from Medium screen sizes
- Text Contrast

**_The Project hasn't been added to Google Chrome Extensions however curious developers are welcome to try this out. Find out more info on the below link_**

[Chrome Developer Docs](https://developer.chrome.com/docs/extensions/mv3/manifest/)
