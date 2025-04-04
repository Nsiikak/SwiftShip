# **SwiftShip** 🚀  
*A Modern Parcel Delivery System*  

## **Overview**  
SwiftShip is a fast and reliable parcel delivery system designed to streamline shipping and tracking processes. It provides real-time updates, seamless order management, and an intuitive user interface for businesses and individuals.  

This project was conceived as part of a **4th-year undergraduate course** to demonstrate full-stack web development skills with PHP, integrating **React (frontend)**, **PHP (backend)**, and **XAMPP (server environment and database management).**  

## **Features**  
✅ **User Authentication** – Secure registration and login for customers and couriers.  
✅ **Parcel Tracking** – Real-time tracking updates for shipments.  
✅ **Order Management** – Users can create, modify, and cancel deliveries.  
✅ **Admin Dashboard** – Manage orders, users, and system settings.  
✅ **Responsive UI** – Optimized for both desktop and mobile devices.  
✅ **Secure Transactions** – Data encryption and secure database storage.  

## **Tech Stack**  
- **Frontend:** React.js (JavaScript, HTML, CSS)  
- **Backend:** PHP (REST API)  
- **Database & Server:** MySQL with XAMPP  

## **Installation & Setup**  
Follow these steps to set up SwiftShip on your local machine:  

### **1. Clone the Repository**  
```bash
git clone https://github.com/Nsiikak/SwiftShip.git
cd SwiftShip
```

### **2. Setup Backend (PHP & XAMPP)**  
- Install **XAMPP** and start **Apache** and **MySQL**.  
- Copy the `backend` folder into the XAMPP `htdocs` directory.  
- Open **phpMyAdmin** and import the `swiftship.sql` file to set up the database.  
- Edit `config.php` to match your database credentials.  

### **3. Setup Frontend (React)**  
- Navigate to the `frontend` folder:  
  ```bash
  cd frontend
  ```
- Install dependencies:  
  ```bash
  npm install
  ```
- Start the development server:  
  ```bash
  npm start
  ```

### **4. Test the API (Postman or Browser)**  
- Check API endpoints in `http://localhost/backend/api/`  
- Ensure React frontend is correctly communicating with the backend.  

## **Usage**  
- **Users:** Sign up/log in, place delivery requests, and track parcels.  
- **Couriers:** Accept delivery tasks and update shipment statuses.  
- **Admin:** Manage users, parcels, and system settings.  

## **Contributors**  
- **Nsikak-Abasi Ebong** – Full Stack Developer  

## **License**  
This project is open-source under the **MIT License**.  
