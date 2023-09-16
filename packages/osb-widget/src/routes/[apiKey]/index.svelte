<script>
  export let context;
  console.log(context);
  export let fragments;
  console.log(fragments);

  import { meta, params, isActive } from "@roxi/routify";
</script>

<h4>Meta</h4>
<pre>{JSON.stringify($meta, null, 2)}</pre>
<pre>{JSON.stringify(params, null, 2)}</pre>
<pre>{JSON.stringify(context.route.params, null, 2)}</pre>
