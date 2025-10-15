import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).end();
  const { name, phone, wilaya, commune, items, total } = req.body;
  if(!name || !phone) return res.status(400).json({error:'missing'});
  try {
    const { data, error } = await supabase.from('orders').insert([{ customer_name: name, phone, wilaya, commune, items, total }]);
    if(error) return res.status(500).json({ error });
    return res.status(200).json({ ok: true, orderId: data[0].id });
  } catch(e){
    return res.status(500).json({ error: e.message });
  }
}