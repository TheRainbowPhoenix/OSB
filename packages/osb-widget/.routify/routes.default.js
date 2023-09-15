import * as _default from '../src/routes/_module.svelte'
import * as _default_hello_world_md from '../src/routes/hello-world.md'
import * as _default_index_md from '../src/routes/index.md'
import * as _default_test_md from '../src/routes/test.md'
import * as _default__apiKey__index_svelte from '../src/routes/[apiKey]/index.svelte'

export default {
  "meta": {},
  "id": "_default",
  "module": () => _default,
  "rootName": "default",
  "file": {
    "path": "src/routes/_module.svelte",
    "dir": "src/routes",
    "base": "_module.svelte",
    "ext": ".svelte",
    "name": "_module"
  },
  "routifyDir": import.meta.url,
  "children": [
    {
      "meta": {
        "dynamic": true
      },
      "id": "_default__apiKey_",
      "name": "[apiKey]",
      "module": false,
      "file": {
        "path": "src/routes/[apiKey]",
        "dir": "src/routes",
        "base": "[apiKey]",
        "ext": "",
        "name": "[apiKey]"
      },
      "children": [
        {
          "meta": {},
          "id": "_default__apiKey__index_svelte",
          "name": "index",
          "module": () => _default__apiKey__index_svelte,
          "file": {
            "path": "src/routes/[apiKey]/index.svelte",
            "dir": "src/routes/[apiKey]",
            "base": "index.svelte",
            "ext": ".svelte",
            "name": "index"
          },
          "children": []
        }
      ]
    },
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
    },
    {
      "meta": {},
      "id": "_default_test_md",
      "name": "test",
      "module": () => _default_test_md,
      "file": {
        "path": "src/routes/test.md",
        "dir": "src/routes",
        "base": "test.md",
        "ext": ".md",
        "name": "test"
      },
      "children": []
    }
  ]
}