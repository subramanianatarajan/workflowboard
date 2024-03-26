Flow Board Application

The "Flow Board" application is a modern project management tool that follows the
principles of the Kanban methodology to help users organize tasks and track project progress efficiently.



Features:

Interactive Kanban board with columns: "Not Started", "In Progress", "Completed"

Task cards with customizable
details: title, description, due date, priority level, assigned user

Drag-and-drop functionality to move tasks between columns

Firebase authentication for secure user login

Local storage for data persistence


Technologies Used:

Frontend: JavaScript, HTML, CSS, Drop and Drop API

Backend: Firebase Authentication for user validation

Data Storage: Web Storage (Local Storage)


Installation:

Clone the repository: git clone https://github.com/subramanianatarajan/workflowboard.git

Navigate to the project directory: cd workflowboard


Starting the Application:

Run the application by opening the start page: /login.html
Log in using your email and password authenticated via Firebase

demo@demo.com
123456
Use the Kanban board to create, manage, and move tasks between columns


 ( Or )

Run in the docker 
Navigate to the project directory: cd workflowboard

>docker build -t workflowboard .
>docker run -dp 8080:80 workflowboard
Open in the browser http://localhost:8080/
Log in using your email and password authenticated via Firebase

demo@demo.com
123456
Use the work flow board to create, manage, and move tasks between columns




Additional Notes:

Make sure to have an active internet connection for Firebase authentication

Data is stored locally using web storage for persistence