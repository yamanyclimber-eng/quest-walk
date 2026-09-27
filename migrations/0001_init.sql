CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE profiles (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  nickname TEXT NOT NULL,
  birth_date TEXT NOT NULL,
  address TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE party_members (
  id TEXT PRIMARY KEY,
  profile_id TEXT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  nickname TEXT NOT NULL,
  birth_date TEXT NOT NULL,
  gender TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE registrations (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  event_date TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'PENDING',
  participant_count INTEGER NOT NULL,
  message TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Magic-link login tokens: single-use, short expiry. Only the hash is
-- stored so a DB read alone can't be replayed as a working token.
CREATE TABLE magic_links (
  token_hash TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  used_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Session tokens: longer expiry, also hashed at rest.
CREATE TABLE sessions (
  token_hash TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_registrations_user_id ON registrations(user_id);
CREATE INDEX idx_party_members_profile_id ON party_members(profile_id);
CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_magic_links_email ON magic_links(email);
