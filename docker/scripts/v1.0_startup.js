db.createUser({
    user: "username",
    pwd: "abc123SonarPlzD0ntMarkMe",
    roles: [{
        role: "readWrite",
        db: "test_db"
    }]
});

db.Categories.insertMany([
    {
        "categoryDesc": "Movies",
        "createdAt": ISODate("2020-07-29T21:21:14.712Z")
    },
    {
        "categoryDesc": "Music",
        "createdAt": ISODate("2020-07-29T21:21:14.712Z")
    },
    {
        "categoryDesc": "Games",
        "createdAt": ISODate("2020-07-29T21:21:14.712Z")
    }
]);

db.Users.insertMany([
    {
        "userName": "asmitty",
        "password": "pass1",
        "firstName": "Andrew",
        "lastName": "Smith",
        "emailAddress": "a.s@test.com"
    },
    {
        "userName": "dmurts",
        "password": "pass2",
        "firstName": "Daverick",
        "lastName": "Murtle",
        "emailAddress": "d.m@test.com"
    }
]);

db.ChatUsers.insertOne({
    "userName": "bsmitty",
    "password": "pass3",
    "firstName": "Benjamin",
    "lastName": "Smith",
    "emailAddress": "b.s@test.com"
});

db.PendingUsers.insertMany([
    {
        "userName": "csmitty",
        "password": "pass4",
        "firstName": "Calvin",
        "lastName": "Smith",
        "emailAddress": "c.s@test.com"
    },
    {
        "userName": "esmitty",
        "password": "pass5",
        "firstName": "Edmund",
        "lastName": "Smith",
        "emailAddress": "e.s@test.com"
    }
]);

db.Movies.insertMany([
    {
        "title": "Captain America: The Winter Soldier",
        "description": "",
        "userId": "321",
        "director": "Anthony Russo",
        "favorite": false,
        "wishlist": false,
        "imdbid": "tt123453",
        "format": "DVD",
        "rating": 0,
        "poster": "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg",
    },
    {
        "title": "Captain America: Civil War",
        "description": "",
        "userId": "321",
        "director": "Anthony Russo",
        "favorite": false,
        "wishlist": false,
        "imdbid": "tt123454",
        "format": "DVD",
        "rating": 0,
        "poster": "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg",
    },
    {
        "title": "Captain America: The First Avenger",
        "description": "",
        "userId": "321",
        "director": "Anthony Russo",
        "favorite": false,
        "wishlist": false,
        "imdbid": "tt123455",
        "format": "DVD",
        "rating": 0,
        "poster": "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg",
    },
    {
        "title": "Doctor Strange",
        "description": "",
        "userId": "321",
        "director": "Anthony Russo",
        "favorite": false,
        "wishlist": false,
        "imdbid": "tt123456",
        "format": "DVD",
        "rating": 0,
        "poster": "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg",
    },
    {
        "title": "Avengers: Age of Ultron",
        "description": "",
        "userId": "321",
        "director": "Anthony Russo",
        "favorite": false,
        "wishlist": false,
        "imdbid": "tt123457",
        "format": "DVD",
        "rating": 0,
        "poster": "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg",
    },
    {
        "title": "Garden State",
        "description": "",
        "userId": "321",
        "director": "Anthony Russo",
        "favorite": false,
        "wishlist": false,
        "imdbid": "tt123458",
        "format": "DVD",
        "rating": 0,
        "poster": "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg",
    }
])