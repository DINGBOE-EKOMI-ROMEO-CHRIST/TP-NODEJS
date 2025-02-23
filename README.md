
# TP-NODEJS - Documentation API

## Base URL
```
http://localhost:3000/api/v1
```

## Routes Utilisateurs

<details>
  <summary>Enregistrement d'un utilisateur (POST)</summary>

  **URL**: `http://localhost:3000/api/v1/users/register`
  **Body**:
        ```json
        {
            "name": "John Doe",
            "email": "john@example.com",
            "password": "password123",
            "salle": 1
        }
        ```
</details>
  
<details>
 <summary>Connexion a un compte utilisateur (POST)</summary>

  **URL**: `http://localhost:3000/api/v1/users/login`
  **Body**:
    ```json
    {
        "email": "john@example.com",
        "password": "password123"
    }
    ```

</details>

<details>
 <summary>Mis a jour d'un utilisateur (PUT)</summary>

  **URL**: `http://localhost:3000/api/v1/users/update/{id}`
  **Body**:
    ```json
    {
        "name": "John Updated",
        "email": "john_updated@example.com",
        "password": "newpassword123",
        "role": "teacher",
        "salle": 2
    }
    ```
</details>
<details>
  <summary>Recuperer tous les utilisateur (GET)</summary>

  **URL**: `http://localhost:3000/api/v1/users/`
</details>

<details>
  <summary>Recuperer un utilisateur avec son id(GET)</summary>

  **URL**: `http://localhost:3000/api/v1/users/{id}`
</details>

<details>
  <summary>Supprimer un utilisateur avec son id (DELETE)</summary>

  **URL**: `http://localhost:3000/api/v1/users/delete/{id}`
</details>

## Routes Projecteurs

<details>
  <summary>Enregistrement d'un projecteur (POST)</summary>

  **URL**: `http://localhost:3000/api/v1/projectors`
  **Body**:
        ```json
        {
            "nom_projecteur": "acer",
            "disponibilite": false
        }
        ```
</details>

<details>
  <summary>Lister les projecteurs disponible (GET)</summary>

  **URL**: `http://localhost:3000/api/v1/projectors`
</details>

<details>
  <summary>Modifier l'etat d'un projecteur (PUT)</summary>

  **URL**: `http://localhost:3000/api/v1/projectors/{id}`
  **Body**:
        ```json
        {
            "nom_projecteur": "acer",
            "disponibilite": true
        }
        ```
</details>

<details>
  <summary>Supprimer un projecteur (DELETE)</summary>

  **URL**: `http://localhost:3000/api/v1/projectors/{id}`
</details>
