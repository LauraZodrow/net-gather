const setLocalStorage = (view) => {

    localStorage.getItem('view', view)
    localStorage.setItem('view', view)

    return

}

export default setLocalStorage