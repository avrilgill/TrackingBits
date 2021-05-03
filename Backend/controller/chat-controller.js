// Create an array to store all the connected users
const usersArray = [];

const addConnection = ({ id, name, room,email }) => {

    // check is the email exists in the same room, if yes then throw error
    const duplicateUser = usersArray.find((tempUser) => tempUser.room === room && tempUser.name === name);
    if (duplicateUser) {
        return { error: 'Username is taken.' };
    }

    // temporarily store the user details in the variable
    const tempUser = { id, name, room,email };

    //add the details to usersArray
    usersArray.push(tempUser);

    //return the value to the function
    return { tempUser };

}

const removeConnection = (id) => {
    // find the user position using id in usersArray
    const position = usersArray.findIndex(tempUser => tempUser.id === id);

    //if array does contain the user details then remove them and return otherwise skip
    if (position !== -1) {
        return usersArray.splice(position, 1)[0];
    }
}

// Arrow function to retrieve the user details
const userDetails = (id) => {

    // retrieve user details by searching the usersArray[] and return the value
    const details = usersArray.find(tempUser => tempUser.id === id);
    return details;
};

// Arrow function to retrieve the user details inside a particular chatroom
const roomUserDetails = (room) => {
    //filter the users in a room from usersArray[] and return the value
    const roomDetails = usersArray.filter(tempUser => tempUser.room === room)
    return roomDetails;
}

// export the functions so they are accessible by other modules/files
exports.addConnection = addConnection;
exports.removeConnection = removeConnection;
exports.userDetails = userDetails;
exports.roomUserDetails = roomUserDetails;