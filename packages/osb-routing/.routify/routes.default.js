import * as _default_hello_world_md from '../src/routes/hello-world.md'
import * as _default_index_md from '../src/routes/index.md'

export default {
  "meta": {},
  "id": "_default",
  "module": undefined,
  "rootName": "default",
  "file": {
    "path": "src/routes",
    "dir": "src",
    "base": "routes",
    "ext": "",
    "name": "routes"
  },
  "routifyDir": import.meta.url,
  "children": [
    {
      "meta": {},
      "id": "_default_hello_world_md",
      "name": "hello-world",
      "module": () => _default_hello_world_md,
      "file": {
        "path": "src/routes/hello-world.md",
        "dir": "src/routes",
        "base": "hello-world.md",
        "ext": ".md",
        "name": "hello-world"
      },
      "children": []
    },
    {
      "meta": {},
      "id": "_default_index_md",
      "name": "index",
      "module": () => _default_index_md,
      "file": {
        "path": "src/routes/index.md",
        "dir": "src/routes",
        "base": "index.md",
        "ext": ".md",
        "name": "index"
      },
      "children": []
    }
  ]
}