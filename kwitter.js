function login() {
    usernameVariable = document.getElementById("username").value;
    localStorage.setItem("username", usernameVariable);
    window.location = "kwitter_room.html";
}