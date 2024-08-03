```mermaid
  flowchart TD
    vue["chibivue"]
    subgraph runtime-core
      createAppFactory["createAppMeta"]
      rendererFactory["createRenderer"]
    end
    subgraph runtime-dom
      createApp
      renderer
      nodeOps
      createApp --> renderer
      renderer --> nodeOps
    end


    createApp --> createAppFactory
    renderer --> rendererFactory
    vue --> createApp



```
