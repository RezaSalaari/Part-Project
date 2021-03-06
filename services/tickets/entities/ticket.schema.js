module.exports.TicketSchema = `
    BEGIN;


DO $$
BEGIN
        CREATE TYPE ticketStatusENUM AS ENUM ('0', '1', '2','3');
EXCEPTION
        WHEN duplicate_object THEN null;
   
END
$$;
    
DO $$
BEGIN
        CREATE TYPE ticketPriority AS ENUM ('0', '1', '2','3');
EXCEPTION
        WHEN duplicate_object THEN null;
   
END
$$;
    
    CREATE TABLE IF NOT EXISTS tickets(
        id SERIAL PRIMARY KEY,
        status ticketStatusENUM DEFAULT ('0'),
        priority ticketPriority,
        userId INT NOT NULL,
        itemId INT NOT NULL,
        operator INT ,
        solved BOOLEAN,
        created_At TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        completed_At TIMESTAMPTZ,
        CONSTRAINT fk_userId FOREIGN KEY(userId) REFERENCES users(id),
        CONSTRAINT fk_operator FOREIGN KEY(operator) REFERENCES users(id));


        CREATE TABLE IF NOT EXISTS comments(
         id SERIAL PRIMARY KEY,
         ticketId INT,
         subject text,
         creator text,
         content text,
         category text,
         liked BOOLEAN DEFAULT 'f',
         created_At TIMESTAMPTZ NOT NULL DEFAULT NOW(),
         CONSTRAINT fk_ticketId FOREIGN KEY(ticketId) REFERENCES tickets(id));
         
         
        COMMIT;`;
