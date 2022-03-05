module.exports.ProductSchema =
`BEGIN;

DO $$
BEGIN
        CREATE TYPE productsState AS ENUM ('0', '1', '2');
EXCEPTION
        WHEN duplicate_object THEN null;
   
END
$$;
 CREATE TABLE IF NOT EXISTS products(
        id SERIAL PRIMARY KEY,
        title text,
        code text UNIQUE NOT NULL,
        status BOOLEAN DEFAULT 't',
        state productsState DEFAULT '0',
        assigned_to INT NOT NULL,
        operator INT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        started_at TIMESTAMPTZ,
        expired_at TIMESTAMPTZ,
        CONSTRAINT fk_assigned_to FOREIGN KEY(assigned_to) REFERENCES users(id),
        CONSTRAINT fk_operator FOREIGN KEY(operator) REFERENCES users(id));
        
        COMMIT;
        `

