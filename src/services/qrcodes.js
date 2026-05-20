import QRCode from 'qrcode';
import supabase from '../lib/supabaseClient.js';

export const generateQR = async (menuId, baseUrl) => {
  const publicUrl = `${baseUrl}/menu/${menuId}`;

  // generate PNG buffer
  const buffer = await QRCode.toBuffer(publicUrl, {
    type: 'png', width: 400,
    margin: 2,
    color: { dark: '#000000', light: '#FFFFFF' }
  });

  // upload to Supabase Storage
  const path = `qr-codes/${menuId}.png`;
  const { error: uploadErr } = await supabase
    .storage.from('menu-assets')
    .upload(path, buffer, {
      contentType: 'image/png',
      upsert: true
    });

  if (uploadErr) throw uploadErr;

  const { data: { publicUrl: imageUrl } } = supabase
    .storage.from('menu-assets')
    .getPublicUrl(path);

  // save to qr_codes table
  const { data, error } = await supabase
    .from('qr_codes')
    .upsert({ menu_id: menuId, public_url: publicUrl,
               image_path: imageUrl })
    .select().single();

  if (error) throw error;
  return data;
};