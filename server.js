const pool = require('./connection.js');


pool.query(`DELETE FROM favorite_books WHERE id = $1`, [deletedRow], (err, {rows}) => {
  if (err) {
    console.log(err);
  }
  console.log(rows);
});

// Query database
pool.query('SELECT * FROM favorite_books', function (err, {rows}) {
  console.log(rows);
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
