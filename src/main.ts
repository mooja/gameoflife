function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = `Hello ${name}`;
}

showHello("greeting", "TypeScript");