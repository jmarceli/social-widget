# Social Widget

Usage

1. Download zipped latest JS files from [releases](https://github.com/jmarceli/social-widget/releases).
2. Unpack them in your website root directory
3. Link files from your website with `<script></script>` tags
4. Add HTML tag/s with approperiate data attributes to display component

Minimal usage example:

```html
<html>
  <body>
    <div data-root data-url="./profile.json"></div>

    <script src="./static/js/1.6609d883.chunk.js"></script>
    <script src="./static/js/runtime~main.4a686d48.js"></script>
    <script src="./static/js/main.d3c350a7.chunk.js"></script>
  </body>
</html>
```

Where:

- `data-root` - indicates element which will be used to mount component
- `data-url` - JSON data source URL

JSON data example:

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

---

Jan Grzegorowski
