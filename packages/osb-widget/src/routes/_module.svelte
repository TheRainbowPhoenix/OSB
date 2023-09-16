<script>
  import { url, node } from "@roxi/routify";

  // returns /hello?theme=dark
  $: url1 = $url("/[apiKey]", {
    apiKey: "client01",
    theme: "dark",
  });

  $: url2 = $url("/[apiKey]", {
    apiKey: "client02",
    theme: "light",
  });
</script>

<a href="/">Home</a>
<a href={url1}>apiKey client01</a>
<a href={url2}>apiKey client02</a>

<slot />
