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
room_name = localStorage.getItem("room_name");

function getData() {
    firebase.database().ref("/" + room_name).on('value', function(snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function(childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;

                console.log(firebase_message_id);
                console.log(message_data);
                named = message_data['name'];
                message = message_data['message'];
                like = message_data['like'];

                nameH3 = "<h4>" + named + "<img src='tick.png' class='tick'></h4>";
                messageOfUser = "<h3>" + message + "</h3>";
                likeButton = "<button class='glyphicon glyphicon-thumbs-up btn btn-info' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'> Like:- " + like + "</span> </button>";
                finalRow = nameH3 + messageOfUser + likeButton;

                document.getElementById("output").innerHTML += finalRow;
            }
        });
    });
}
getData();

function updateLike(message_id) {
    console.log("Like button clicked " + message_id);
    buttonId = message_id;
    likes = document.getElementById(buttonId).value;
    updatedLike = Number(likes) + 1;
    console.log(updatedLike);
    firebase.database().ref(room_name).child(message_id).update({
        like: updatedLike
    });

}

function send() {
    message = document.getElementById("message").value;
    firebase.database().ref(room_name).push({
        name: user_name,
        message: message,
        like: 0
    });
    document.getElementById("message").value = "";
}

function logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("room_name");
    window.location.replace("index.html");
}