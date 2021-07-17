#
Mini challenge completed for FCC in regards to learning APIs and microservices (for this challenge, Node/Express/MongoDB are used for API creation, Nodemon is used for live reloading, with allowed CORS policy).

A database is set up so when the user types a new user in the input box and clicks "Submit", the POST method is invoked and user is saved in the database.

When the user goes to endpoint /api/users, an array of all users in the database will be returned.

A POST method is implemented for endpoint /api/users/:_id/exercises with form data description, duration, and optionally date. If no date is supplied, the current date will be used. The response returned will be the user object with the exercise fields added.

You can make a GET request to /api/users/:_id/logs to retrieve a full exercise log of any user.

You can add from, to and limit parameters to a /api/users/:_id/logs request to retrieve part of the log of any user.

Link to the project challenge: [Exercise Tracker](https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/exercise-tracker)
