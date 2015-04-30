[![Code Climate](https://codeclimate.com/repos/55425e846956805770003704/badges/56df94ad5f8cef25549a/gpa.svg)](https://codeclimate.com/repos/55425e846956805770003704/feed)
![Version 1.0.0](https://img.shields.io/badge/Version-1.0.0-brightgreen.svg)


# frontrow

> Customizable modals for the humanity. No jQuery required and no dependencies.

## Demo
See a [simple live demo here!](http://omarfouad.github.io/frontrow/)

## Install

From npm

```shell
npm install --save frontrow
```

or manually (from the dist folder)

```html
<link rel="stylesheet" href="frontrow.min.css">
<script src="frontrow.min.js"></script>
```

## Usage

### `frontrow(elem, [options])`

This (only) method allows you to launch a modal window when the `elem` is clicked. The `options` object (optional) can have the following properties, which will help you customize the modal's behaviours:

Option              | Description
--------------------|--------------------------------------------------------------------------------------------------
`title`             | The title of the modal which appears in its header
`confirmBtnText`    | The text of the confirm button. Defaults to `'Confirm'`
`cancelBtnText`     | The text inside the cancel link. Defaults to `'cancel'`
`confirmCallback`   | The callback function that executes when the confirm button is clicked. Defaults to `frontrow.dispose()` thus, closes the modal
`overlayColor`      | The CSS color property of the overlay behind the modal. Defaults to `'white'`
`overlayOpacity`    | The CSS opacity property of the overlay behind the modal. Defaults to `0.8`
`content`           | The selector of the DOM element (inner) that will be rendered in the modal's body
`width`             | The width of the modal. If set to `'none'`, it will take the entire page's width. If set to `'auto'`, the modal will take the width of the content. Defaults to `'300px'`
`height`            | The height of the modal. If none is specified, it will automatically set itself to fit the content of the modal. If specified, a vertical scrollbar will appear **only** if there is not enough room for the content

More options will be added soon.

## API

When you create a modal using `frontrow(elem, options)`, an instance of `modal` is returned. This instance exposes a few methods which you can use to manipulate the actual modal before/after is rendered.

### .show()

This allows you to render and show a modal without clicking on the associated button:

```js
<button id="myModal">Launch Modal</button>

var modal = frontrow('myModal');
modal.show(); // Shows the modal
```

### .set(option, value)

This sets the value of one of the options to the instance. If the `modal` is showing already, the options are set on the fly.
You can use any of the [options in the table above](#usage).

```js
<button id="myModal">Launch Modal</button>

var modal = frontrow('myModal', {title: 'Hello World!'});
modal.set('title', 'Another Title!');
modal.show(); // Shows the modal with the new title
modal.set('title', 'Changed again'); // switches the title on the fly
modal.set('overlayColor', 'red'); // Switches the overlay color on the fly
```

## Other functions

### frontrow.dispose()

This method will remove the current modal from the DOM. This will not need an instance because

## Roadmap

#### Soon:
- Load content from a remote HTML file (AJAX)
- Add styling API
- Suggest new stuff

## Development

Installing any dependencies

```shell
npm install
```

Then run Gulp

```shell
gulp
```

Lastly open the page and any changes you make just need a browser refresh.

```shell
open index.html
```

## License

MIT
