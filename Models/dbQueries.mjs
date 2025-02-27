const db = require("../config/db");


const addUser = (email, hashedPassword, role, callback) => {
  db.query(
    "INSERT INTO users (email, password, role) VALUES (?, ?, ?)",
    [email, hashedPassword, role || "etudiant"],
    callback
  );
};

const getUserByEmail = (email, callback) => {
  db.query("SELECT * FROM users WHERE email = ?", [email], callback);
};

const addProjector = (name, status, available, callback) => {
  db.query(
    "INSERT INTO projectors (name, status, available) VALUES (?, ?, ?)",
    [name, status || "fonctionnel", available || true],
    callback
  );
};

const getAvailableProjectors = (callback) => {
  db.query("SELECT * FROM projectors WHERE available = TRUE", callback);
};

const updateProjectorStatus = (id, status, available, callback) => {
  db.query(
    "UPDATE projectors SET status = ?, available = ? WHERE id = ?",
    [status, available, id],
    callback
  );
};

const deleteProjector = (id, callback) => {
  db.query("DELETE FROM projectors WHERE id = ?", [id], callback);
};

const addReservation = (userId, projectorId, startTime, endTime, callback) => {
  db.query(
    "INSERT INTO reservations (user_id, projector_id, start_time, end_time) VALUES (?, ?, ?, ?)",
    [userId, projectorId, startTime, endTime],
    callback
  );
};

const getReservations = (callback) => {
  db.query(
    `SELECT r.id, u.email, p.name, r.start_time, r.end_time 
     FROM reservations r
     JOIN users u ON r.user_id = u.id
     JOIN projectors p ON r.projector_id = p.id`,
    callback
  );
};

const deleteReservation = (id, callback) => {
  db.query("DELETE FROM reservations WHERE id = ?", [id], callback);
};

module.exports = {
  addUser,
  getUserByEmail,
  addProjector,
  getAvailableProjectors,
  updateProjectorStatus,
  deleteProjector,
  addReservation,
  getReservations,
  deleteReservation,
};
