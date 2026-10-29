CREATE TABLE IF NOT EXISTS payment_orders (
  id UUID PRIMARY KEY,
  reference VARCHAR(80) NOT NULL UNIQUE,
  status VARCHAR(20) NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING','APPROVED','DECLINED','VOIDED','ERROR')),
  currency CHAR(3) NOT NULL DEFAULT 'COP',
  amount_in_cents BIGINT NOT NULL CHECK (amount_in_cents > 0),
  subtotal_cop BIGINT NOT NULL CHECK (subtotal_cop > 0),
  delivery_fee_cop BIGINT NOT NULL CHECK (delivery_fee_cop >= 0),
  customer JSONB NOT NULL,
  items JSONB NOT NULL,
  wompi_transaction_id VARCHAR(120) UNIQUE,
  payment_method_type VARCHAR(60),
  raw_event JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS payment_orders_status_idx ON payment_orders(status);
CREATE INDEX IF NOT EXISTS payment_orders_created_at_idx ON payment_orders(created_at DESC);
