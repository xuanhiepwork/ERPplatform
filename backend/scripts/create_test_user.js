const { db } = require('../src/core/config/db');

(async () => {
  try {
    const email = 'test.user@example.com';
    const password = 'password123';
    const full_name = 'Test User';
    const role = 'Employee';
    const dept_id = 1;
    const status = 'Active';

    // Check if user already exists
    const [existing] = await db.query('SELECT id FROM users WHERE email = ? LIMIT 1', [email]);
    if (existing.length > 0) {
      console.log('User already exists:', existing[0].id);
      process.exit(0);
    }

    const [result] = await db.query(
      'INSERT INTO users (full_name, email, password, role, dept_id, status, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())',
      [full_name, email, password, role, dept_id, status]
    );

    console.log('Inserted user id:', result.insertId);
  } catch (err) {
    console.error('Error inserting user:', err.message || err);
    process.exit(1);
  } finally {
    process.exit(0);
  }
})();
