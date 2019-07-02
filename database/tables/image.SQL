BEGIN TRANSACTION;


CREATE TABLE users (id serial PRIMARY KEY,
                                      email text UNIQUE NOT NULL,
                                                        hash VARCHAR(100) NOT NULL,
                                                                          joined TIMESTAMP NOT NULL);


COMMIT;