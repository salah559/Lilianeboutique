-- Supabase / Postgres schema for Lilian Boutique
create extension if not exists "pgcrypto";

create table products (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  description text,
  category text,
  price numeric(10,2) not null,
  created_at timestamptz default now()
);

create table product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  size text,
  color text,
  sku text,
  stock int default 0
);

create table variant_images (
  id uuid primary key default gen_random_uuid(),
  variant_id uuid references product_variants(id) on delete cascade,
  url text not null,
  position int default 0
);

create table orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  phone text not null,
  wilaya text not null,
  commune text not null,
  items jsonb not null,
  total numeric(10,2) not null,
  payment_method text default 'COD',
  status text default 'pending',
  created_at timestamptz default now()
);