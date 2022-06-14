# yelp-camp

## URL
https://arcane-savannah-69920.herokuapp.com/
- Jump right in and explore our many campgrounds!
- Feel free to share some of your own and comment on others!

## About Campground

### Install
- user must install npm dependencies and start in order for the code to work in your local environment
#### Command
- npm install && npm start

### Purpose
- The purpose of this app is to sharpen the skills for FULL STACK Development cycles.
- This app is focused more on BACKEND development rather than the FRONTEND
- Used Bootstrap frameworks for styling to speed up the process and practice CSS frameworks
- Also good practice to avoid any user error to sharpen my critical thinking skills (i.e require fields for submitting form)

### Technologies
#### Front-end
- HTML
- CSS
- JavaScript
- ejs
#### Back-end
- Node.js
- Express.js
- Mongoose
- MongoDB
- Axios
#### Tools
- cloudinary
- multer
- passport
- joi

### User Guide
- This is the app similar to actual YelpCamp app, the user can post their experience on campgrounds they visited and share to the world!
- If the users wants to edit or post their campground there are some restrictions (explains below). If the user is simply looking, no requirements are needed
- This app has few restrictions when editing/changing campgrounds/comments for security purposes:
    1. Users must register their account
    2. User must log in
    3. Only the SAME user account can edit/delete their campgrounds and comments (if any user can delete or edit campgrounds, there is no point!)
- The app has authorization function in order to avoid unwanted users to modify any comments or campground.
- When creating campgrounds, user must enter the required fields before user can submit their campground

### Demo video
![Demo yelp-camp](./demo-yelpcamp (1).gif)
