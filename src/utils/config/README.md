# nextUI component how to.

Documentation how to use the components of nextUI.

# documentation link

[nextUi documentation of components and installment guide] (https://nextui.org/docs/frameworks/nextjs)

# Check dependencies.

check "package.json" that the wanted comonent is already installed.
the components are always part of: "@nextui-org/<componentName>" : ... 

# install needed component.

If the needed component is not installed, run the command to install it in the CLI with the needed component name:
```bash
nextui add button
```

These installs can be chained to instal multiple components in one go:
```bash
nextui add button input
```

Or the component name can be left blank, then the CLI will give an interactive list with selectable components to install.
(sometimes takes a time to load the options.)
```bash
nextui add
```

# import components into files.

At the top of a page use the corresponding inport.
```bash
import { Button } from '@nextui-org/button'; 
```

Note: you need to import the component from the individual package, not from @nextui-org/system.

Then you can use the component like normal components, some allow children.
```bash
<Button>Click me</Button>
```