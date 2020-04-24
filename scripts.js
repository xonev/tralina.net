function render() {
    const div = document.createElement('div');
    const text = document.createTextNode('Hello, my dear');
    div.appendChild(text);
    document.body.innerHTML = div;
}