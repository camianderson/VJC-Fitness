# Welcome to VJC Fitness!!!

## An activity tracker that tracks and displays a users Hydration & Sleep habits!

### Table of contents
* [Setting Up](#setup)
* [How To Use](#how)
* [Under The Hood](#under)
* [Challenges](#challenges)
* [Reflections](#reflections)
* [Future Iterations](#future)
* [Technologies Used](#tech)
* [Contributors](#contributors)

### Setting Up: <a name="setup"></a>

* On the top right corner of this page, click the **Fork** button to fork this repo.
* Clone down the forked repo by clicking the green **Code** button, and then copying the link under **SSH**.
* In your terminal, type in `git clone` and then paste the link.
* Once you have cloned the repo, change into the directory and install the project dependencies, by running `npm install`.
* Run `npm start` in the terminal, and copy the URL link (`http://localhost:8080/`) to see the HTML page 
* To stop running the server, use Control + C in the terminal. (Closing the terminal without stopping the server first could allow the server to continue to run in the background and cause problems.)
* Clone [this](https://github.com/turingschool-examples/fitlit-api) repo down, change into the directory and install the project dependencies, by running `npm install`.
* Then run: `npm start` to be able to access the local API server used by the website. To stop the local API server from running in your terminal use command + c.
* And now you're ready to start!

### How To Use: <a name="how"></a>

* Select the user you would like to display from the dropdown menu at the top right of the page!

* Once a user is selected, they are welcomed to our page and can see their user info, recent activity data and hydration stats for 7 days.

https://user-images.githubusercontent.com/98445902/172243113-8f0cc359-4e85-44a3-adda-b1aa825cb9dc.mov

* While on this user, select a date from the calendar and the following information will be displayed:
    * The users water consumption for that date!
    * The users all-time daily average for how much water they consume per day!
    * A fancy-shmancy chart that displays the users water intake by day for the previous week! Wow!!


* If you'd like to see another users info, just select another user from the dropdown menu! The new users info will be displayed under the dropdown and the previous users info will dissapear!

* When you click on the **Sleep** image on the bottom left of the page, you'll be able to see the users **Sleep Habits**!

https://user-images.githubusercontent.com/98445902/172243202-97385cb8-a0b6-413c-a948-40367a92eca8.mov

* Select a date from the calendar, and the following info will be displayed:
    * How many hours that user slept, and also the quality of their sleep on that day!
    * The users all-time daily averages of their hours of sleep, as well as their quality of sleep!
    * Also, another wonderful chart that displays the users hours of sleep, and quality of sleep (side-by-side) for the past week! Nice!

* When you click on the **Activity** image on the bottom left of the page, you'll be able to see the users **Activity Data**!

https://user-images.githubusercontent.com/98445902/172243237-57309fab-9123-4f91-b751-e9882495f67e.mov


* You can move back and forth from the **Water**, **Sleep** and **Activity** information by simply clicking on the images on the bottom-left of the page!

<br>

### Under the Hood: <a name="under"></a>
Please click the dropdowns below to dive into the details of how we accomplished this.
<details>
<summary>User Info Display Details</summary>

* Our team created **User** class file to bring in the user info from an API database: ID, Name, Address, Email, Stride-Length, Daily Step Goal, and their Friends

* We then created functionality to display only their first name with a `returnFirstName()` method that uses the `.split()` to break-up each part of their name into different strings and then only returns the first.

* After this was created, we created a **UserRepository** class which uses the `.map()` iterator to return the user data object.

* Within this class, we created a `getUser()` method that gets the user info by `id`, by using the `.find()` array iterator to find the user id from the API data and makes sure it matches the id of the user that is selected from the dropdown. This method is then accessed in the `scripts.js` file within the `chooseUser()` method that we created to display the users info on the webpage.

* We also created an `averageStepGoal()` method that gets the users average step-goal by using the `.reduce()` array iterator to add up all the users steps per day, and then we divide that by the length of the users entries. We wrapped this in a `Math.round()` method, so that the returned value is a whole number. This method is then accessed in the `scripts.js` file within the `displayUserInfo()` method that displays the users info on the top-right of the page.

* Alongside the **User** and **UserRepository** classes we also created **User-test** and **UserRepository-test** files to test our code and ensure it runs properly. Within these testing files we used **Mocha** and **Chai** languages to test our implementaion code.

</details>

<details>
<summary>Hydration Info Display Details</summary>

* Aligned with the **User** class, we also created seperate classes for the user: **Hydration** and **HydrationRepository**

* The **Hydration** class pull in the users hydration data from an API database: ID, Date, and Ounces

* The **HydrationRepository** class holds all the methods that are then accessed in the `scripts.js` file where all the DOM manipulation happens.

* The **HydrationRepository** brings in the users hydration data and, like the **User** class, brings in the data by using the `.map()` iterator to return the user data object.

* We created the `displayAllTimeAvgOunces()` to display the users all-time average of daily water consumption. The method uses the `.filter()` iterator to grab the users **id** and then uses the `.reduce()` iterator to add the users total water consumption daily for all-time. We then calculate that users average water intake by dividing the water consupmtion by the how many entries that user has. We again use `Math.round()` to return a whole number. This method is then accessed in the `scripts.js` file within the `waterDataDisplay()` which displays the users data to the page.

* The `displayDailyAvgOunces()` method we created displays the users water intake for the date selected from the calendar. This method uses the `.filter()` iterator to grab the users **id**. We then use the `.find()` iterator to access the date that is selected from the calendar. This method is then accessed in the `scripts.js` file within the `waterDataDisplay()` which displays the users data to the page.

* The `displayWeekWaterIntake()` method we created gets the users water intake data and displays the previous weeks data from the date selected on the calendar. We do this by using the `.filter()` iterator to grab the users **id**. We then use `.findIndex()` to grab the index of the date selected. We then use `.slice()` to return the previous six days of data from the selected date on the calendar. Finally we `.map()` through the data and returns the data for that date. This method is then accessed in the `scripts.js` file within the `waterDataDisplay()` which shows the users data on the page.

* The `displayWaterByDate()` method we created gets the users water intake by day. This method runs the same as the `displayWeekWaterIntake()` and is accessed in the `scripts.js` file within the `waterDataDisplay()` which shows the users data on the page.

* Finally, we created a `displayWeeklyWaterChart()` which uses `chart.js` to display the users **Water** data in a chart. This method is accessed in the `scripts.js` file within the `waterDataDisplay()` which shows the users data on the page.

* Alongside the **Hydration** and **HydrationRepository** classes we also created **Hydration-test** and **HydrationRepository-test** files to test our code and ensure it runs properly. Within these testing files we used **Mocha** and **Chai** languages to test our implementaion code.

</details>

<details>
<summary>Sleep Info Display Details</summary>

* For this data, we again created two classes: **Sleep** & **SleepRepository**

* The **Sleep** class brings in the users sleep data from an API database: ID, Date, Hours Slept, and Sleep Quality

* The **SleepRepository** class holds all the methods that are then accessed in the `scripts.js` file where all the DOM manipulation happens.

* The **SleepRepository** brings in the users sleep data and, like the **User** and **Hydration** classes, brings in the data by using the `.map()` iterator to return the user data object.

* The `displayUserHoursSleepAllTime()` method was created to show the average number of hours slept per day by a user. It grabs the users by **id**, and then add their total sleep per day using the `.reduce()` iterator, and we then divide that by the number of sleep entries that user has. This method is then accessed in the `scripts.js` file within the `sleepDataDisplay()` to display the users sleep data on the page.

* The `displayUserSleepQualityAllTime()` method was created to show the users average sleep quality per day over all time. This method again grabs the users by **id**. The rest of the function runs the same as the `displayUserHoursSleepAllTime()` method, and is also accessed in the `scripts.js` file within the `sleepDataDisplay()` to display the users sleep data on the page.

* The `displayDailySleepHours()` method was created to show the selected users hours of sleep. It uses `.filter()` to move through the users and make sure the **id** matches with the user that is selected. We then use `.find()` to find the date within the data that was filtered. We then return that value. This method is then accessed in the `scripts.js` file within the `sleepDataDisplay()` to display the users sleep data on the page.

* The `displaySleepQualityByDate()` method was created to show the users sleep quality for a specific day. If uses `.filter()` to run through the users to match the **id** of the user selected. We then use `.find()` to find the date of the value that was filtered. This method is then accessed in the `scripts.js` file within the `sleepDataDisplay()` to display the users sleep data on the page.

* The `displayWeekSleepHours()` method was created to get the user data for how many hours a user slept each day over the course of a given week. This method uses `.filter()` to find the **id** of the user selected. We then use `.findIndex()` on that value to target the date value. This value is then iterated over using `.slice()` to return the previous six days of data from the selected date on the calendar. This method is then accessed in the `scripts.js` file within the `sleepDataDisplay()` to display the users sleep data on the page.

* The `displayWeekSleepQualityHours()` method was created to get the data for the users sleep quality each day over the course of a given week. This method runs the same as the `displayWeekSleepHours()` method, but grabs the sleep quality data. This method is then accessed in the `scripts.js` file within the `sleepDataDisplay()` to display the users sleep data on the page.

* Like the **HydrationRepository** we again use a chart to display the past weeks info of the date selected for a user. We created the `displayWeeklySleepChart()` method to not only grab the data for sleep hours, but also sleep quality, so that we could display the data side-by-side on the page. This method is then accessed in the `scripts.js` file within the `sleepDataDisplay()` to display the users sleep data on the page.

* Alongside the **Sleep** and **SleepRepository** classes we also created **Sleep-test** and **SleepRepository-test** files to test our code and ensure it runs properly. Within these testing files we used **Mocha** and **Chai** languages to test our implementaion code.

</details>

<details>
<summary>DOM Manipulation Details</summary>

* For the DOM manipulation, all the functionality was written in the `scripts.js` file, where we wrote display function that accessed the methods created within the **User**, **UserRepository**, **HydrationRepository**, **SleepRepository** and **ActivityRepository** classes.

* We imported our data from the class files by using the `import` keyword, and ensuring the data was coming `from` the correct filepath.

* We created several `querySelector`'s to access different elements within the **HTML** to be able to manipulate the DOM. 

* The initial `loadData()` method we created to (as it says) load all the data on the page. Using the `Promise.all()` method we take in the `getData()` and pass a string as argument to attach in the end of the URL to fetch the proper API from the `apiCalls.js` file, and then loads the data upon user and date selection from the page. Within the `loadData()` method, we also wrote in the `datepicker()` method which uses the `datepicker.js` file we downloaded from the NPM site to allow us to pick dates from a calendar to display that users data. An `addEventListener` was added to the `window` object of the page on load. 

* The `displayDropDownInfo()` method was writen to take in a user that is selcted from the dropdown on the page and display that users information, relating to ID, Name, Address, Email, Stride-Length, and Daily Step Goal. This method is accessed within the `loadData()` method to aid in the execution of the user data display. 

* The `chooseUser()` method takes in both the `userRepository` and `hydrationRepository` data and displays the data upon selectoin from the dropdown. This method is accessed within the `loadData()` method to aid in the execution of displaying the user data.

* The `displayUserInfo()` method was created to display the users info (ID, Name, Address, Email, Stride-Length, Daily Step Goal) in the box on the top right of the page after selection from the dropdown menu. This method is accessed within the `chooseUser()` method.

* The `waterDataDisplay()` method takes in the users id, the date, and the hydration repository data, and accesses methods from the **HydrationRepository** class to display the users data concerning their water intake. 

* The `sleepDataDisplay()` method takes in the same information as the `waterDataDisplay()`, and accesses methods from the **SleepRepository** class to dislay the users data concerning their sleep habits.
   
* The `activityDataDisplay()` method takes in the same information as the `waterDataDisplay()`, and accesses methods from the **ActivityRepository** class to dislay the users data concerning their activity habits.

* A `clearData()` method was created to clear out the data from a previous user after a new user is selected. 

</details><br>

### Challenges: <a name="challenges"></a>
This was our first group project of Mod 2 at [Turing](https://turing.edu/) within the [Front-End Program](https://frontend.turing.edu/), and we were tasked to implement new and unfamiliar methods and practices within, such as API fetches, using the Promise.all(), implementing charts, applying a datepicker to show a users stats, etc... We all put our heads together to come up with solutions to the challenges we faced as a team, and, together, we conquered.

<br>

### Reflections: <a name="reflections"></a>
Being on the other end of this project, the realization of how many hours that went into it definitely sits with all of us. There was a lot of time put into this and a lot of new information we had to learn on the fly. All in all, we're extremely proud of the fact that we made it to this point. It's a point of pride that we stuck through it, put in the hours, and came out on the other side with a functional product.


<br>

### Future Iterations: <a name="future"></a>
* Design a step challenge between friends. Assign your user a few friends from the user data file. Add the methods you need and a display on the dashboard to see their friends step count for a whole week, and then show who had the most steps for that week.
* Calculate and display this trend: for a user, what days had increasing steps for 3 or more days?
* Drag-and-drop widgets (if you did not go with a widget theme, then add some widgets for this extension). You can use a 3rd-party library to help you accomplish this.
* Priority stats - give the user the ability to select the widgets they always want to see at the top of the page. This is a customization the user would want to make, and you would want to save this customization to localStorage.

<br>

### Technologies used:<br><a name="tech"></a>
JavaScript<br>
HTML<br>
CSS<br>
Fetch API<br>
Webpack<br>
Mocha<br>
Chai<br>

<br>


### Contributors: <a name="contributors"></a>

Cami Anderson: [LinkedIn](https://www.linkedin.com/in/camianderson/) | [GitHub](https://github.com/camianderson)  

Victoria Fox-Collis: [LinkedIn](https://www.linkedin.com/in/victoria-fox-collis/) | [GitHub](https://github.com/VictoriaFC)

Jordan Farelli: [LinkedIn](https://www.linkedin.com/in/jordan-farelli/) | [GitHub](https://github.com/jfarelli)
