# Latex Utilities Extension for Visual Studio Code

This is an extension with utility functions for LaTeX,
this extension is recommended to be used along with [LaTeX-Workshop](https://marketplace.visualstudio.com/items?itemName=James-Yu.latex-workshop)

## Features

![Demo](./demo.gif)

This extension is still in early development, and does not have a lot of features yet.

### Implemented features

- Toggle bold, italic, underline and custom commands with shortcuts.
- Automatically add `\item` when enter is pressed inside a `\begin{itemize}` tag

## Requirements

This extension does _not_ require anything to work,
however it is recommended to use some other LaTeX extension, for compiling and previewing documents.

## Extension Settings

This extension contributes the following settings:

- `latex-utils.automaticItemTags`: Whether or not to automatically add `\item` when enter is pressed inside a `\begin{itemize}` tag

### Shortcuts

> NOTE: `cmd` will be `ctrl` on Windows and Linux

#### Text wrapping
- `cmd`+`l` `cmd`+`e` - Make selection emphasized
- `cmd`+`l` `cmd`+`b` - Make selection bold
- `cmd`+`l` `cmd`+`u` - Make selection underlined
- `cmd`+`l` `cmd`+`i` - Make selection italic
- `cmd`+`l` `cmd`+`c` - Make selection _custom keyword_

## Release Notes

See [Changelog](./CHANGELOG.md)
