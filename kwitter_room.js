var firebaseConfig = {
    apiKey: "AIzaSyC_Bzy66SYr60EcLK8oo-qJtIzZfoiWWes",
    authDomain: "kwitter-d1328.firebaseapp.com",
    databaseURL: "https://kwitter-d1328-default-rtdb.firebaseio.com",
    projectId: "kwitter-d1328",
    storageBucket: "kwitter-d1328.appspot.com",
    messagingSenderId: "431507324722",
    appId: "1:431507324722:web:3814bb58bf854c0508a12b",
    measurementId: "G-XXVDK8C32M"
};

firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("username");
document.getElementById("username").innerHTML = "Welcome " + user_name + "!";

function addRoom() {
    room_name = document.getElementById("room_name").value;
    firebase.database().ref("/").child(room_name).update({
        purpose: "Add room name"
    });
    localStorage.setItem("room_name", room_name);
    window.location = "kwitter_page.html";
}

function getData() {
    firebase.database().ref("/").on('value', function(snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function(childSnapshot) {
            childKey = childSnapshot.key;
            Room_names = childKey;

            console.log("room name" + Room_names);
            row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)'>#" + Room_names + "</div> <hr>";
            document.getElementById("output").innerHTML += row;

        });
    });
}
getData();

function redirectToRoomName(name) {
    console.log(name);
    localStorage.setItem("room_name", name);
    window.location = "kwitter_page.html";

}

function logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}