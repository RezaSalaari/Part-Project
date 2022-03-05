module.exports.UserSchema =

`
BEGIN;


DO $$
BEGIN
        CREATE TYPE userRoles AS ENUM ('0', '1', '2','3');
EXCEPTION
        WHEN duplicate_object THEN null;
   
END
$$;
CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        firstName text,
        lastName text,
        phoneNumber text,
        gender integer NOT NULL,
        role userRoles NOT NULL,
        userName text UNIQUE NOT NULL,
        password integer NOT NULL);

DO $$
BEGIN
        INSERT INTO users(gender,role,username,password)
        VALUES ('1','0','admin','123456') ON CONFLICT DO NOTHING ;
END
$$;
    
        
        COMMIT;
        `;
