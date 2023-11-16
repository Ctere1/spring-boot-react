<h1 align="center">
  Spring-boot React
  
 
  ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
  ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
  ![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
  ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
  ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
  <br>
</h1>

<p align="center">
  <a href="#ℹ%EF%B8%8F-introduction">Introduction</a> •
  <a href="#installation-guide">Installation Guide</a> •
  <a href="#screenshots">Screenshots</a> •
  <a href="#license">License</a> •
  <a href="#contributors">Contributors</a> 
</p>

<div align="center">

![GitHub Repo stars](https://img.shields.io/github/stars/Ctere1/spring-boot-react)
![GitHub forks](https://img.shields.io/github/forks/Ctere1/spring-boot-react)
![GitHub watchers](https://img.shields.io/github/watchers/Ctere1/spring-boot-react)

</div>

## ℹ️ Introduction

- This is a simple application to demonstrate how to integrate Spring Boot and React. 
- The application is a simple tutorial application that allows users to register and login to the application. Once the user logs in, they can view a list of tutorials. The user can also create, edit and delete tutorials. 
- JWT is used for authentication and authorization. (Role based)

> [!TIP]    
> For more detail about the application, please refer to the following project: [Spring Boot](https://github.com/Ctere1/spring-boot) 

> [!NOTE]     
>Application creates (register) default user as "ROLE_USER". You can add more users with different roles via API or swagger. 

## 💾Installation Guide

- To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

    ```bash
     # Clone this repository
    $ git clone https://github.com/Ctere1/spring-boot-react
    # Go into the repository
    $ cd spring-boot-react
    # Install dependencies
    $ npm install
    # Run the app
    $ npm start
    ```

## 📷Screenshots

### **Login - Signup Pages**
> * User can login on this page.
>
>   ![Login](./screenshots/ss.png)
>
> * User can signup on this page.
>
>   ![Signup](./screenshots/ss2.png)


### **Home Page**
> * Home page.
> 
>   ![Profile](./screenshots/ss4.png)


### **User Pages**
> * User can see own profile on this page.
>
>   ![Profile](./screenshots/ss3.png)
>
>
> * User can edit, list and delete tutorials on this page.
> 
>   ![Profile](./screenshots/ss5.png)
>   ![Profile](./screenshots/ss6.png)
>   ![Profile](./screenshots/ss7.png)

### **Boards Pages**
> * ROLE_USER can see the content on this page.
>
>   ![Profile](./screenshots/ss8.png)

> * ROLE_MOD can see the content on this page.
>
>   ![Profile](./screenshots/ss9.png)

> * ROLE_ADMIN can see the content on this page.
>
>   ![Profile](./screenshots/ss10.png)

### **Navbar**
> * Navbar changes according to the user's role. 
> * Below is an example of the navbar for ROLE_ADMIN, ROLE_MOD and ROLE_USER.
>
>   ![Profile](./screenshots/ss11.png)


## ©License
![GitHub](https://img.shields.io/github/license/Ctere1/spring-boot-react?style=flat-square)


## 📌Contributors

<a href="https://github.com/Ctere1/">
  <img src="https://contrib.rocks/image?repo=Ctere1/Ctere1" />
</a>

