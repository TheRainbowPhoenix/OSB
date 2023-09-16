

export default {
  "meta": {},
  "id": "_default",
  "name": "",
  "file": {
    "path": "src/routes/_module.svelte",
    "dir": "src/routes",
    "base": "_module.svelte",
    "ext": ".svelte",
    "name": "_module"
  },
  "asyncModule": () => import('../src/routes/_module.svelte'),
  "rootName": "default",
  "routifyDir": import.meta.url,
  "children": [
    {
      "meta": {
        "dynamic": true,
        "order": false
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
          "meta": {
            "isDefault": true,
            "user": "test"
          },
          "id": "_default__apiKey__index_svelte",
          "name": "index",
          "file": {
            "path": "src/routes/[apiKey]/index.svelte",
            "dir": "src/routes/[apiKey]",
            "base": "index.svelte",
            "ext": ".svelte",
            "name": "index"
          },
          "asyncModule": () => import('../src/routes/[apiKey]/index.svelte'),
          "children": []
        }
      ]
    },
    {
      "meta": {},
      "id": "_default_hello_world_md",
      "name": "hello-world",
      "file": {
        "path": "src/routes/hello-world.md",
        "dir": "src/routes",
        "base": "hello-world.md",
        "ext": ".md",
        "name": "hello-world"
      },
      "asyncModule": () => import('../src/routes/hello-world.md'),
      "children": []
    },
    {
      "meta": {
        "isDefault": true
      },
      "id": "_default_index_md",
      "name": "index",
      "file": {
        "path": "src/routes/index.md",
        "dir": "src/routes",
        "base": "index.md",
        "ext": ".md",
        "name": "index"
      },
      "asyncModule": () => import('../src/routes/index.md'),
      "children": []
    },
    {
      "meta": {},
      "id": "_default_test_md",
      "name": "test",
      "file": {
        "path": "src/routes/test.md",
        "dir": "src/routes",
        "base": "test.md",
        "ext": ".md",
        "name": "test"
      },
      "asyncModule": () => import('../src/routes/test.md'),
      "children": []
    },
    {
      "meta": {
        "dynamic": true,
        "dynamicSpread": true,
        "order": false
      },
      "name": "[...404]",
      "file": {
        "path": ".routify/components/[...404].svelte",
        "dir": ".routify/components",
        "base": "[...404].svelte",
        "ext": ".svelte",
        "name": "[...404]"
      },
      "asyncModule": () => import('./components/[...404].svelte'),
      "children": []
    }
  ]
}