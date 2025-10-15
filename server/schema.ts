import { pgTable, uuid, text, numeric, integer, timestamp, jsonb } from 'drizzle-orm/pg-core';

export const products = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  category: text('category'),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const productVariants = pgTable('product_variants', {
  id: uuid('id').primaryKey().defaultRandom(),
  productId: uuid('product_id').references(() => products.id, { onDelete: 'cascade' }).notNull(),
  size: text('size'),
  color: text('color'),
  sku: text('sku'),
  stock: integer('stock').default(0),
});

export const variantImages = pgTable('variant_images', {
  id: uuid('id').primaryKey().defaultRandom(),
  variantId: uuid('variant_id').references(() => productVariants.id, { onDelete: 'cascade' }).notNull(),
  url: text('url').notNull(),
  position: integer('position').default(0),
});

export const orders = pgTable('orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  customerName: text('customer_name').notNull(),
  phone: text('phone').notNull(),
  wilaya: text('wilaya').notNull(),
  commune: text('commune').notNull(),
  items: jsonb('items').notNull(),
  total: numeric('total', { precision: 10, scale: 2 }).notNull(),
  paymentMethod: text('payment_method').default('COD'),
  status: text('status').default('pending'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});
