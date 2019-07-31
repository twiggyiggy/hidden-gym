# Project Name

## Description

A service that allows users to find a calisthenics gym in Barcelona, view details about specific gyms, and leave a personal rating based on their experience. 
 
## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
- **sign up** - As a user I want to sign up on the webpage so that I can see all the events that I could attend
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **gym list** - As a user I want to see all the gyms in the area so that I can choose which ones I want to work out at
- **gym filter** - As a user I want to be able to easily filter the gyms by neighborhood
- **gym create** - As a user I want to create a new gym so that I can contirbute to the official list
- **gym detail** - As a user I want to see the gym details and so that I can learn more about it
- **gym edit** - As a user I want to update gym details so that I can keep them up to date
- **gym delete** - As a user I want to delete a gym details so that the information is up to date in case a gym is knocked down
- **menu button** - As a user I want to click on the menu button to see where I can go on the app
- **log out** - As a user I want to log out if I'm not using the app

## Backlog

List of other features outside of the MVPs scope

Geo Location:
- find users location 
- gyms near me - orders the gyms list based on proximity

### Users Interaction

- allows users to join together and visit a gym together

### Map Display / Map Search

- map of each gym's location and pins

- the ability to search a specific barrio


## ROUTES:
- GET /
 - renders splash screen
- GET /auth/signup
  - redirects to /gyms if user logged in
  - renders the signup form (with flash msg)
- POST /auth/signup
  - redirects to /gyms if user signed up
  - body:
    - username
    - password
- GET /auth/login
  - redirects to /gyms if user logged in
  - renders the login form (with flash msg)
- POST /auth/login
  - redirects to /gyms if user logged in
  - body:
    - username
    - password
- POST /auth/logout
  - body: (empty)
  - redirect to /

- GET /gyms
  - renders the gyms list

- GET /gyms/:id
  - renders the gyms details

- GET /gyms/create
  - renders the create form
- POST gyms/create
  - body: 
    - location
    - image
    - description
    - equipment
- GET /gyms/:id/edit
  - renders the edit form
- POST /gyms/:id/edit
 // - redirects to /gyms/:id
  - body: 
    - location
    - image
    - description
    - equipment
  - POST /gyms/:id/delete
   - redirect to /gyms


## Models

User model
 
```
username: String
password: String
gyms: Array[ObjectId<gym>]
```

gym model

```
creator: ObjectId<User>
location: String
description: String
image: url
upvotes: number
usersVotes: number
averageRating: number

``` 

## Links

### Trello

[Link to your trello board](https://trello.com) or picture of your physical board

### Git

The url to your repository and to your deployed project

[Repository Link](http://github.com)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)