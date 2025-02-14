## Highlighting in code fences

Highlighting in code fences is enabled by default. A Copy button will
automatically be added to every highlighted codeblock. If you wish to disable
the copy button for a single codeblock, you can do so by adding the
`disable-copy` class attribute after the language identifier.

```
bash {class=disable-copy}
```

## Tabpane

If you want to add tabs to your content, you can use the `tabpane` shortcode.

```markdown
{{< tabpane >}}
  {{< tab "Tab 1" >}}
  Markdown
  {{< /tab >}}
  {{< tab "Tab 2" >}}
  Markdown
  {{< /tab >}}
{{< /tabpane >}}
```

If you would like the tabpane state to be persisted in the url when a user
selects a tab, you can enable this behavior by setting the `id` parameter in the
`tabpane` shortcode. For example:

```markdown
{{< tabpane id="install" >}}
  {{< tab "CLI" >}} ...
```

If you are using a `tabpane` with a single codeblock in each pane, you can set
the `code` parameter to `true`, and the tabs will be be inset into a codeblock.
For example:

````markdown
{{< tabpane id="install" code="true" >}}
  {{< tab "yaml" >}}
  ```yaml
    name: John
    age: 30
  ```
  {{< /tab >}}
  {{< tab "json" >}}
  ```json
  {
    "name": "John",
    "age": 30
  }
  ```
  {{< /tab >}}
{{< /tabpane >}}
````

If you would like to add a title before the tabs, you can set the `title`
parameter.  For example:

````markdown
{{< tabpane id="install" title="config/_default/hugo." code="true" >}}
  {{< tab "yaml" >}}
    ...
  {{< /tab >}}
  {{< tab "toml" >}}
    ...
  {{< /tab >}}
  {{< tab "json" >}}
    ...
  {{< /tab >}}
{{< /tabpane >}}
````

### `tabpane` parameters:

| Name       | Value   | Description                                                                                      |
| ---------- | ------- | ------------------------------------------------------------------------------------------------ |
| 0: `id`    | String  | Id of the tabpane; **Reminder:** Make sure you don't use the same `id` more than once on a page! |
| 1: `title` | String  | Title of tabpane                                                                                 |
| 2: `code`  | Boolean | If `true`, inset into codeblock; Defaults to `false`                                             |

### `tab` parameters:

| Name          | Value   | Description                          |
| ------------- | ------- | ------------------------------------ |
| 0: `label`    | String  | The text displayed in the tab button |
| 1: `selected` | Boolean | Defaults to `false`                  |
