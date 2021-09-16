# Online-Store
# An Online Store built using `Node Js and MongoDB`

## Demo

https://user-images.githubusercontent.com/87245784/133527860-0039158a-168a-4c18-a708-51202ee1e1b4.mp4

---

# How To Set Up:

## Set Up MongoDB ->

https://user-images.githubusercontent.com/87245784/133527994-446f1e04-c257-4ec2-97dd-01e053f09dc3.mp4

https://account.mongodb.com/account/register

1- Fill the required fields and `Sign Up`, make sure to Verify

2- Hit on `Build a Databse` and pick the Basic option

3- Leave all as is, you can of course change the Cluster name if you'd like to, hit `Create Cluster`

4- While waiting for the cluter to get created, head over to `Network Access` and allow access from everywhere

5- After the cluster gets created, hit on `Connect` and set up a username and a password and hit on `Create Database User`

6- Pick `Connect your application`, make sure Node.js is picked and copy the connection string

7- Open the project and head to `app.js` and paste the string there

8- Replace `<password>` with the password you used in Step 5

---

## Optional, Set Up MongoDB Compass ->

https://user-images.githubusercontent.com/87245784/133529079-922e30a2-fd11-48b1-86ad-6253cc0302fc.mp4

https://www.mongodb.com/try/download/compass

Makes it easier to view and manage your database

1- After Installing MongoDB Compass, hit on `Connect` and pick `Connect using MongoDB Compass`

2- Copy the connection string

3- Open MongoDB Compass and paste the string there

4- Replace `<password>` with the password you used in the previous step and press on `Connect`

---

## Set Up Stripe ->

https://user-images.githubusercontent.com/87245784/133529416-96a82fac-df9b-4d8a-959b-150d47342c7a.mp4

https://dashboard.stripe.com/register

1- Fill up the sign up form and hit `Create Account`, make sure to verify your account

2- go to `Developers` and then `API Keys`

3- Open the project and head to `checkout.ejs` and paste the `Publishable Key`

4- Head to `shop.ejs` and paste the `Secret Key`

---

## Set Up SendGrid ->

https://user-images.githubusercontent.com/87245784/133529811-f1c0b302-43ae-46f6-b4e3-fc8fa69990b3.mp4

https://signup.sendgrid.com

1- Fill up the sign up form and hit `Create Account`, fill out the rest of the required fields and press `Get Started`

2- Hit on `Create a Single User`, fill the required fields and hit on `Create`, make sure to verify

3- Head over to API Keys and press on `Create API Key`

4- Give the key a name an pick Full Access

5- Copy the key and save it somewhere as you won't be able to access it again

6- Open the project, head to `auth.js` and paste the key

7- in `auth.js`, make sure to put the email you used to create the singe sender in the `from` field inside of `postSignup` and `postReset`


---

## Running The App

1- Create a folder named `images` in the root directory of the project, reason being is that I can't commit an empty folder, so you you're gonna have to do it manually

2- Open the project using vs code or whatever you prefer to use and run `npm install` in the terminal

3- after its done, run `npm start` in the terminal as well

4- visit `localhost:3000` on your favourite browser and you're all set!

---

## Credits

https://www.udemy.com/course/nodejs-the-complete-guide/






