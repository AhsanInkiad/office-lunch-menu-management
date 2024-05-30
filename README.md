
# Office-lunch-menu-management

The Office Lunch Menu Management System is a web application built using MERN stack. User of a total of 2 types of roles will use this i.e. admin and non-admin (normal user/employee).


## Technologies used:

**Frontend:** React, Vite, React Router,  Tailwind, DaisUI, Firebase, SweetAlert, Moment.js, Moment Timezone

**Backend:** Node, Express

**Databse:** MongoDB

**Deployment:** Vercel (server side), Netlify (client side)

## Demo:

**Website Link (Client Side)**: https://665883328484c01676e45117--kaleidoscopic-starburst-be71ac.netlify.app/

**Serve Side:** https://office-lunch-menu-management-server.vercel.app/

Sample:
```bash
https://office-lunch-menu-management-server.vercel.app/menu

https://office-lunch-menu-management-server.vercel.app/order

https://office-lunch-menu-management-server.vercel.app/user
```
## Features:

**Admin**:
- Add Daily Menu according to date
- View Employee Choices
- Modify user role i.e. making Admin
- Sign up, Login, Log out
- View various statisitics 

**User (Employee)**:
- View Daily Menu
- Select Lunch Choice
- Submit Choice
- Sign up, Login, Log out


## Database schema:
**Menu Collection:**
```bash
{
  "_id": "ObjectId",
  "id": "String",
  "date": "Date",
  "created_by": "String",
  "options": [
    {
      "option_id": "String",
      "option_text": "String",
      "ingredients": ["String"],
      "image": "String"
    }
  ]
}

```

**Order Collection:**
```bash
{
  "_id": "ObjectId",
  "date": "Date",
  "email": "String",
  "name": "String",
  "ordered": ["String"]
}


```

**User Collection:**
```bash
{
  "_id": "ObjectId",
  "name": "String",
  "email": "String",
  "role": "String" // optional, only for admin users
}

```


## Installation

At first clone the project:

```bash
 git clone https://github.com/AhsanInkiad/office-lunch-menu-management.git

```
Now enter in the office-lunch-menu-management folder:
```bash
 cd office-lunch-menu-management
```
Install all the dependencies/packages using npm:
```bash
 npm install
```
Then, start the project in your local host:
```bash
  npm run dev
```

 

    
## How to run project:


**Use as Admin:**

Login: 
```bash
Admin-1:
  email: miraj@abc.com 
  password: mirajs

Admin-2:
  email: rafi@abc.com 
  password: rafis
```

Add Daily Menu:
```bash
Date: (select the date from date picker, make sure no menu was added for that date, you can see it in home page)
Created By: (use the user's (admin's) name)
Option ID: (this is fixed)
Option Text (Food Name): Biriyani
Ingredients (comma seperated): Chicken, Basmati rice, Onion, Spices
Food Image URL: (copy and paste an image url from google pictues) 

[Add another option will add another menu for that day. If still confused check the Menu Collection in Database schema]
```


**Use as non-admin (Employee):**

Login: 
```bash
User-1:
  email: sakib@abc.com 
  password: sakibs

User-2:
  email: rahim@abc.com 
  password: rahims

User-3:
  email: karim@abc.com 
  password: karims
```

