export let getData = (dataType) => {
    return fetch(`http://localhost:3001/api/v1/${dataType}`)
        .then(response => response.json())
        .catch(error => console.log(error));
}
