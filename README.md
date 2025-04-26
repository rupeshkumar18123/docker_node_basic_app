Sahi pakde bhai! Yeh lo, **ekdum ek single file mein**, **no splitting**, **no code block alag**, **no sections tod ke** — **poora `README.md` content** ek hi jagah par, seedha copy karo aur paste karo:

---

# MongoDB Admin Network using Docker

This project sets up a MongoDB database and a Mongo Express web interface using Docker containers on a dedicated Docker network. Mongo Express provides a GUI to interact with the MongoDB instance running inside another container.

Additionally, this can be used in conjunction with a basic Node.js web application for registering and logging in users.

**GitHub Repository:** [docker_node_basic_app](https://github.com/rupeshkumar18123/docker_node_basic_app)

---

## 🧩 Project Structure

- **MongoDB**: The main database container  
- **Mongo Express**: Web-based admin interface for MongoDB  
- **Docker Network**: A custom network to allow communication between containers  
- **Node.js App (optional)**: A basic registration/login web app that connects to the MongoDB container  

---

## 🚀 Step-by-Step Setup

### ✅ Step 1: Create a Docker Network

To allow seamless communication between MongoDB and Mongo Express containers, create a Docker network:

```
docker network create mongo-network
```

This isolates the containers for MongoDB and Mongo Express. The containers will discover each other by container name.

---

### ✅ Step 2: Run MongoDB Container

Run a MongoDB container with root credentials and expose port 27017:

```
docker run -d \
  -p 27017:27017 \
  --name mongo \
  --network mongo-network \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=qwerty \
  mongo
```

**Explanation**:

- `-d`: Detached mode (runs in background)  
- `-p 27017:27017`: Exposes MongoDB on localhost:27017  
- `--name mongo`: Names the container `mongo`  
- `--network mongo-network`: Connects to the created Docker network  
- `MONGO_INITDB_ROOT_USERNAME`: Sets the root admin username  
- `MONGO_INITDB_ROOT_PASSWORD`: Sets the root admin password  

---

### ✅ Step 3: Run Mongo Express Container

Set up Mongo Express for MongoDB administration:

```
docker run -d \
  -p 8081:8081 \
  --name mongo-express \
  --network mongo-network \
  -e ME_CONFIG_MONGODB_ADMINUSERNAME=admin \
  -e ME_CONFIG_MONGODB_ADMINPASSWORD=qwerty \
  -e ME_CONFIG_MONGODB_URL="mongodb://admin:qwerty@mongo:27017" \
  mongo-express
```

**Explanation**:

- `-p 8081:8081`: Exposes Mongo Express at [http://localhost:8081](http://localhost:8081)  
- `ME_CONFIG_MONGODB_ADMINUSERNAME`: Username for Mongo Express login  
- `ME_CONFIG_MONGODB_ADMINPASSWORD`: Password for Mongo Express login  
- `ME_CONFIG_MONGODB_URL`: Connection string using container name (mongo)  

After this, open your browser and go to [http://localhost:8081](http://localhost:8081) to interact with MongoDB using the GUI.

---

## 📦 Node.js Application Integration (Optional)

You can use this Mongo setup with a Node.js web app for registration and login functionality.

**Repository:** [https://github.com/rupeshkumar18123/docker_node_basic_app](https://github.com/rupeshkumar18123/docker_node_basic_app)

**Features**:

- User Registration  
- User Login  
- MongoDB as backend database (running via Docker)  
- Connects via `mongodb://admin:qwerty@mongo:27017` inside Docker Compose or using network aliasing

--------------------------------------------------------------------------------------------------