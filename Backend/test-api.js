// Using built-in fetch

const BASE_URL = 'http://localhost:8000/api/v1';

async function testBackend() {
  console.log('--- Testing Backend APIs ---');
  let cookieHeader = '';

  try {
    // 1. Register User
    console.log('\n[1] Registering User...');
    const userEmail = `testuser_${Date.now()}@test.com`;
    let res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'Test User',
        email: userEmail,
        password: 'password123'
      })
    });
    
    let data = await res.json();
    console.log('Response:', res.status, data);
    
    // Check cookies for token
    const rawCookie = res.headers.get('set-cookie');
    if (rawCookie) {
      cookieHeader = rawCookie.split(';')[0];
    } else {
      console.log('⚠️ No cookie received. Logging in explicitly...');
      res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, password: 'password123' })
      });
      data = await res.json();
      console.log('Login Response:', res.status, data);
      const loginCookie = res.headers.get('set-cookie');
      if (loginCookie) cookieHeader = loginCookie.split(';')[0];
    }

    if (!cookieHeader) throw new Error('Authentication failed, no cookie obtained.');
    console.log('✅ Authentication successful');

    // 2. Create Team
    console.log('\n[2] Creating Team...');
    res = await fetch(`${BASE_URL}/teams`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Cookie': cookieHeader
      },
      body: JSON.stringify({ name: 'Alpha Team', description: 'Test Team' })
    });
    data = await res.json();
    console.log('Response:', res.status, data);
    if (!data.success) throw new Error('Failed to create team');
    const teamId = data.data.id;
    console.log('✅ Team created with ID:', teamId);

    // 3. Create Project
    console.log('\n[3] Creating Project...');
    res = await fetch(`${BASE_URL}/teams/${teamId}/projects`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Cookie': cookieHeader
      },
      body: JSON.stringify({ name: 'Project X', description: 'Secret project' })
    });
    data = await res.json();
    console.log('Response:', res.status, data);
    if (!data.success) throw new Error('Failed to create project');
    const projectId = data.data.id;
    console.log('✅ Project created with ID:', projectId);

    // 4. Create Task
    console.log('\n[4] Creating Task...');
    res = await fetch(`${BASE_URL}/projects/${projectId}/tasks`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Cookie': cookieHeader
      },
      body: JSON.stringify({ title: 'Finish backend', priority: 'HIGH' })
    });
    data = await res.json();
    console.log('Response:', res.status, data);
    if (!data.success) throw new Error('Failed to create task');
    console.log('✅ Task created with ID:', data.data.id);

    console.log('\n🎉 All core backend flows tested successfully!');
  } catch (err) {
    console.error('❌ Test Failed:', err.message);
  }
}

testBackend();
