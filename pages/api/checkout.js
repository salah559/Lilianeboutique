import { db } from '../../server/db';
import { orders } from '../../server/schema';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const { name, phone, wilaya, commune, items, total } = req.body;
  
  if (!name || !phone) return res.status(400).json({ error: 'missing' });
  
  try {
    const result = await db.insert(orders).values({
      customerName: name,
      phone,
      wilaya,
      commune,
      items,
      total,
    }).returning();
    
    return res.status(200).json({ ok: true, orderId: result[0].id });
  } catch (e) {
    console.error('Checkout error:', e);
    return res.status(500).json({ error: e.message });
  }
}
