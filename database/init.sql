CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    event_type VARCHAR(255) NOT NULL,
    event_data JSONB
);

