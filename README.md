<h1 align="center">Guide Tips</h1>
<p align="center">A simple and easy to use website boot plugin for beginners</p>

[![NPM version](https://img.shields.io/npm/v/guide-tips "npm")](https://www.npmjs.com/package/guide-tips)

<a href="https://saynull.com/guide-tips/demo">Demo</a>

## Getting started
### Installation

Install using npm

```bash
npm install guide-tips
```

Including files

```html
<script src="/dist/guide-tips.min.js"></script>
```

Optional use of CDN

```html
<script src="https://unpkg.com/guide-tips@1.0.5/dist/guide-tips.min.js"></script>
```

### Usage

#### Syntax

```javascript
new GuideTips(config);
```

- **config** (configuration)
  - Type: `Object`
  - [Click to see all configuration options](#config)

#### Example

```javascript
// html
<div id="box_1" style="width:90px;height:90px;background:red;margin: 30px;"></div>
<div id="box_2" style="width:60px;height:120px;background:green;margin: 30px;"></div>


// javascript
import GuideTips from 'guide-tips';

const gt = new GuideTips({
    guideList: [
        {
            els: ["#box_1"],
            title: "step1",
            context: "This is step one"
        },
        {
            els: ["#box_2"],
            title: "step2",
            context: "This is step two"
        }
    ]
});
gt.begin();
```


## config

You may use "new GuideTips(config)" to initialize "guide-tips".

### guideList

- Type: `Array<Object>`
- Default: `[]`
- Options:
  - els: `Array<String>` An array of element selectors to display.
  - title: `String` This' Tips' popover title.
  - context: `String` This' Tips' popover Context.
  - center: `Boolean` Whether the content scrolls to the middle of the screen.
- Boot step configuration list.

### activeIndex

- Type: `Number`
- Default: `0`
- Current active item.

### mask

- Type: `Boolean`
- Default: `true`
- Whether to open the mask layer.

### backText

- Type: `String`
- Default: `back`
- The text of the previous step button.

### nextText

- Type: `String`
- Default: `next`
- This next button text.

### closeText

- Type: `String`
- Default: `close`
- The text of this close button.

## Methods
- instance method.

### begin()
- Guide the start.

### hide()
- Hiding Instance Elements.

### show()
- Show instance elements.

### closeAfter()
- Fires when the closed.

### destroy()
- Destroy the current instance.
