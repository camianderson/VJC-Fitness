export let getData = (dataType) => {
    return fetch(`https://fitlit-api.herokuapp.com/api/v1/${dataType}`)
        .then(response => response.json())
        .catch(error => console.log(error));
}
