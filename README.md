# Social Widget

## Installation

1. Download latest JS file from [releases](https://github.com/jmarceli/social-widget/releases) or directly [social-widget.min.js](https://github.com/jmarceli/social-widget/releases/download/v0.1.1/social-widget.min.js)
2. Place it in your website root directory and link with `<script...></script>` tags

OR

1. Link it directly from Github (not recommended) with: `<script src="https://github.com/jmarceli/social-widget/releases/download/v0.1.1/social-widget.min.js"></script>`

## Example

Check project Github Pages for usage example:

https://jmarceli.github.io/social-widget/

## Documentation

There is only a single HTML tag required to display this social widget.

```html
<div data-root data-url="./harvey.json"></div>
```

Where:

- `data-root` - indicates element which will be used to mount component
- `data-url` - JSON data source URL

JSON data source example:

```json
{
  "profile": {
    "imgSrc": "./harvey-specter.jpg",
    "name": "Harvey Specter",
    "city": "New York",
    "country": "USA",
    "likes": 121,
    "following": 723,
    "followers": 4433
  },
  "commentList": [
    {
      "author": "Mike Ross",
      "content": "New. Lorem ipsum dolor it amet enim. Etiam...",
      "pubTimestamp": 1542942781731,
      "imgSrc": "./harvey-specter.jpg"
    },
    {
      "author": "Mike Ross",
      "content": "Lorem ipsum dolor it amet enim. Etiam...",
      "pubTimestamp": 1542542781731,
      "imgSrc": "./harvey-specter.jpg"
    },
    {
      "author": "Mike Ross",
      "content": "OLD. Lorem ipsum dolor it amet enim. Etiam...",
      "pubTimestamp": 1542411681731,
      "imgSrc": "./harvey-specter.jpg"
    },
    {
      "author": "Mike Ross",
      "content": "Lorem ipsum dolor it amet enim. Etiam...",
      "pubTimestamp": 1542542781731,
      "imgSrc": "./harvey-specter.jpg"
    },
    {
      "author": "Mike Ross",
      "content": "Lorem ipsum dolor it amet enim. Etiam...",
      "pubTimestamp": 1542542781731,
      "imgSrc": "./harvey-specter.jpg"
    },
    {
      "author": "Mike Ross",
      "content": "Lorem ipsum dolor it amet enim. Etiam...",
      "pubTimestamp": 1542542781731,
      "imgSrc": "./harvey-specter.jpg"
    },
    {
      "author": "Mike Ross",
      "content": "Lorem ipsum dolor it amet enim. Etiam...",
      "pubTimestamp": 1542542781731,
      "imgSrc": "./harvey-specter.jpg"
    }
  ]
}
```

Where:

- `profile` - is a profile data section
- `profile.imgSrc` - person image in profile section (absolute or relative URL to image)
- `profile.name` - person name
- `profile.city` - location info
- `profile.country` - location info
- `profile.likes` - number of likes
- `profile.following` - number of followed people
- `profile.followers` - number of followers (incremented with FOLLOW button)
- `commentList[]` - array with comment objects
- `commentList[].author` - comment author name and surname
- `commentList[].content` - comment content
- `commentList[].pubTimestamp` - comment publication timestamp
- `commentList[].imgSrc` - comment author image

## Known bugs

- empty `commentList` info message doesn't have correct font-family
- empty `commentList[].imgSrc` is not supported

## TODO

- persistance support (e.g. LocalStorage)
- cross-browser compatibility test (e.g. with BrowserStack)
- "load more" button for comments on comments list
- JSON values validation
- unwanted padding after closing comments list

---

Jan Grzegorowski
