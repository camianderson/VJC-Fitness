// Your fetch requests will live here!
export let userDataList = () => {
    return fetch("https://fitlit-api.herokuapp.com/api/v1/users")
        .then(response => response.json())
        .catch(error => console.log(error));
}

export let userHydrationList = () => {
    return fetch("https://fitlit-api.herokuapp.com/api/v1/hydration")
        .then(response => response.json())
        .catch(error => console.log(error));
}

export let userSleepList = () => {
    return fetch("https://fitlit-api.herokuapp.com/api/v1/sleep")
        .then(response => response.json())
        .catch(error => console.log(error));
}
