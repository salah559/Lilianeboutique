import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { products, productVariants, variantImages } from '../../server/schema';
import { eq } from 'drizzle-orm';

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const allProducts = await db.select().from(products);
      
      const productsWithVariants = await Promise.all(
        allProducts.map(async (product) => {
          const variants = await db
            .select()
            .from(productVariants)
            .where(eq(productVariants.productId, product.id));
          
          const variantsWithImages = await Promise.all(
            variants.map(async (variant) => {
              const images = await db
                .select()
                .from(variantImages)
                .where(eq(variantImages.variantId, variant.id));
              return { ...variant, images };
            })
          );
          
          return { ...product, variants: variantsWithImages };
        })
      );
      
      return res.status(200).json({ products: productsWithVariants });
    } catch (error) {
      console.error('Error fetching products:', error);
      return res.status(500).json({ error: 'Error fetching products' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { title, slug, description, category, price, variants: productVariantsData } = req.body;
      
      if (!title || !slug || !price) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const [newProduct] = await db
        .insert(products)
        .values({
          title,
          slug,
          description,
          category,
          price: price.toString(),
        })
        .returning();

      if (productVariantsData && productVariantsData.length > 0) {
        for (const variantData of productVariantsData) {
          const [newVariant] = await db
            .insert(productVariants)
            .values({
              productId: newProduct.id,
              size: variantData.size,
              color: variantData.color,
              sku: variantData.sku,
              stock: variantData.stock || 0,
            })
            .returning();

          if (variantData.images && variantData.images.length > 0) {
            for (let i = 0; i < variantData.images.length; i++) {
              await db.insert(variantImages).values({
                variantId: newVariant.id,
                url: variantData.images[i],
                position: i,
              });
            }
          }
        }
      }

      return res.status(201).json({ success: true, product: newProduct });
    } catch (error) {
      console.error('Error creating product:', error);
      return res.status(500).json({ error: 'Error creating product' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const { id, title, slug, description, category, price, variants: productVariantsData } = req.body;
      
      if (!id) {
        return res.status(400).json({ error: 'Product ID required' });
      }

      await db.transaction(async (tx) => {
        await tx
          .update(products)
          .set({
            title,
            slug,
            description,
            category,
            price: price.toString(),
          })
          .where(eq(products.id, id));

        await tx.delete(productVariants).where(eq(productVariants.productId, id));

        if (productVariantsData && productVariantsData.length > 0) {
          for (const variantData of productVariantsData) {
            const imageUrls = variantData.images || [];
            const validImageUrls = imageUrls.filter(img => typeof img === 'string' && img.length > 0);

            const [newVariant] = await tx
              .insert(productVariants)
              .values({
                productId: id,
                size: variantData.size,
                color: variantData.color,
                sku: variantData.sku,
                stock: variantData.stock || 0,
              })
              .returning();

            if (validImageUrls.length > 0) {
              for (let i = 0; i < validImageUrls.length; i++) {
                await tx.insert(variantImages).values({
                  variantId: newVariant.id,
                  url: validImageUrls[i],
                  position: i,
                });
              }
            }
          }
        }
      });

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error updating product:', error);
      return res.status(500).json({ error: 'Error updating product: ' + error.message });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { id } = req.body;
      
      if (!id) {
        return res.status(400).json({ error: 'Product ID required' });
      }

      await db.delete(products).where(eq(products.id, id));

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error deleting product:', error);
      return res.status(500).json({ error: 'Error deleting product' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
