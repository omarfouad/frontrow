# frontrow

> Customizable modals for the humanity. No jQuery required and no dependencies.

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
`confirmCallback`   | The callback function that executes when the confirm button is clicked
`overlayColor`      | The CSS color property of the overlay behind the modal. Defaults to `'white'`
`overlayOpacity`    | The CSS opacity property of the overlay behind the modal. Defaults to `0.8`
`content`           | The selector of the DOM element (inner) that will be rendered in the modal's body
`width`             | The width of the modal. If `'none'` is passed, it will take the entire page's width. Defaults to `'300px'`
`height`            | The height of the modal. If none is specified, it will automatically set itself to fit the content of the modal. If specified, a vertical scrollbar will appear **only** if there is not enough room for the content

More options will be added soon.

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
open example/index.html
```

## License

MIT
