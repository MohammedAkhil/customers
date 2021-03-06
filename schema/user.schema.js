module.exports = {
  userTableQuery: `CREATE TABLE IF NOT EXISTS Users(id INT(50) NOT NULL AUTO_INCREMENT,
			firstName VARCHAR(20), 
			lastName VARCHAR(20), 
			fatherName VARCHAR(20), 
			panNumber VARCHAR(20) UNIQUE, 
			dateOfBirth VARCHAR(20),
			gender VARCHAR(20),
			address VARCHAR(254),
			profileImage VARCHAR(100), 
			email VARCHAR(254) UNIQUE,
			created_ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			PRIMARY KEY(id));
		`,
};
