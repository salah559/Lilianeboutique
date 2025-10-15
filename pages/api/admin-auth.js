
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password } = req.body;
  
  if (!password) {
    return res.status(400).json({ error: 'Password required' });
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  
  console.log('Password received:', password);
  console.log('Admin password from env:', adminPassword);
  console.log('Match:', password === adminPassword);
  
  if (!adminPassword) {
    return res.status(500).json({ error: 'ADMIN_PASSWORD not configured in Secrets' });
  }
  
  // مقارنة مباشرة مع trim للتأكد من عدم وجود مسافات
  if (password.trim() === adminPassword.trim()) {
    return res.status(200).json({ success: true });
  } else {
    return res.status(401).json({ error: 'Invalid password' });
  }
}
