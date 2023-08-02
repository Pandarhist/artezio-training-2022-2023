'use strict';

const sizeFormat = Object.freeze(['b', 'Kb', 'Mb', 'Gb', 'Tb', 'Pb', 'Eb', 'Zb', 'Yb']);

function generateTree() {
    const rootNode = buildTree(parseFileSystemResources());

    const treeContainer = document.getElementById('tree');
    treeContainer.replaceChildren();
    treeContainer.append(...createDirectoryPresentation(rootNode));
}

function parseFileSystemResources() {
    const htmlElements = document.getElementsByClassName('resource');
    const resources = [];

    for (let element of htmlElements) {
        resources.push(parseResource(element));
    }

    return resources;
}

function parseResource(element) {
    const name = element.getElementsByTagName('h2')[0].textContent;
    const resourceData = element.getElementsByTagName('li');
    const type = resourceData[0].lastChild.textContent.trim();
    const size = resourceData[1].lastChild.textContent.trim();
    const location = resourceData[2].lastChild.textContent.trim();

    return createResource(name, type, size, location);
}

function createResource(name, type, size, location) {
    const resource = {
        name,
        type,
        location,
    };

    if (type === 'D') {
        resource.children = [];
    }

    if (type === 'F') {
        resource.size = size;
    }

    return resource;
}

function buildTree(resources) {
    const rootNode = createResource('ROOT', 'D', '-', '-');
    const directories = new Map([[rootNode.name, rootNode.children]]);

    resources.forEach((item) => {
        if (item.type === 'D') {
            setDirectoryChildren(item);
        }

        let directory = directories.get(item.location);

        if (!directory) {
            directory = [];

            directories.set(item.location, directory);
        }

        directory.push(item);
    });

    function setDirectoryChildren(item) {
        const children = directories.get(item.name);
        
        if (!children) {
            directories.set(item.name, item.children);
        } else {
            item.children = children;
        }
    }

    return rootNode;
}

//#region DOM-элементы

function createDirectoryPresentation(directory) {
    const directoryHeader = createDirectoryHeader(directory.name);
    const result = [directoryHeader];

    if (directory.children.length > 0) {
        result.push(createContentPresentation());
    }

    function createContentPresentation() {
        const treeWrapper = createTreeWrapper();
        const tree = createTree();

        for (let resource of directory.children) {
            const item = document.createElement('li');
            item.append(createConnectorLine(), ' ');

            if (resource.type === 'F') {
                item.append(createFilePresentation(resource));
            } else {
                item.append(...createDirectoryPresentation(resource));
            }

            tree.append(item);
        }

        treeWrapper.append(tree);

        return treeWrapper;
    }

    return result;
}

function createDirectoryHeader(name) {
    const directoryHeader = document.createElement('span');
    directoryHeader.className = 'header';
    directoryHeader.textContent = name;

    return directoryHeader;
}

function createTreeWrapper() {
    const hierarchyLine = document.createElement('div');
    hierarchyLine.className = 'tree-hierarchy-line';

    const treeWrapper = document.createElement('div');
    treeWrapper.className = 'tree-wrapper';
    treeWrapper.appendChild(hierarchyLine);

    return treeWrapper;
}

function createTree() {
    const tree = document.createElement('ul');
    tree.className = 'tree';

    return tree;
}

function createConnectorLine() {
    const connectorLine = document.createElement('span');
    connectorLine.className = 'tree-connector-line';

    return connectorLine;
}

function createFilePresentation(resource) {
    const fileSize = document.createElement('span');
    fileSize.className = 'size';
    fileSize.textContent = formatSize(+resource.size);

    const result = document.createElement('span');
    result.className = 'file-header';
    result.textContent = resource.name;
    result.append(' ', fileSize);

    return result;
}

//#endregion

function formatSize(byteSize) {
    let counter = 0;

    while (byteSize >= 1024 && counter !== sizeFormat.length - 1) {
        byteSize = Math.floor(byteSize * 100 / 1024) / 100;
        counter++;
    }

    return `[${byteSize}${sizeFormat[counter]}]`;
}
