
# TP-NODEJS - Documentation API

## Base URL
```
http://localhost:3000/api/v1
```

## Endpoints

### 1. **Register**

**POST** `http://localhost:3000/api/v1/users/register`

Cette route permet d'enregistrer un nouvel utilisateur.

#### Request Body

```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "salle": 1
}
```

### 2. **Login**

**POST** `http://localhost:3000/api/v1/users/login`

Cette route permet à un utilisateur de se connecter.

#### Request Body

```json
{
    "email": "john@example.com",
    "password": "password123"
}
```
### 3. **Update a User**

**PUT** `http://localhost:3000/api/v1/users/update/{id}`

Cette route permet de mettre à jour les informations d'un utilisateur.
#### Request Body

```json
{
    "name": "John Updated",
    "email": "john_updated@example.com",
    "password": "newpassword123",
    "role": "teacher",
    "salle": 2
}
```
### 4. **Recuperer tous les Users**

**GET** `http://localhost:3000/api/v1/users/`

Cette route permet de récupérer la liste de tous les utilisateurs.

### 5. **Recuperer un utilisateur avec son ID**

**GET** `http://localhost:3000/api/v1/users/{id}`

Cette route permet de récupérer les données d'un utilisateur spécifique par son ID.

### 6. **Delete a User**

**DELETE** `http://localhost:3000/api/v1/users/delete/{id}`

Cette route permet de supprimer un utilisateur en fonction de son ID.