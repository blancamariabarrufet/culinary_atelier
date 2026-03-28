-- ============================================
-- Recipes Database (Supabase / PostgreSQL)
-- ============================================

-- --------------------------------------------
-- Recipe types (categories)
-- --------------------------------------------
CREATE TABLE tipos_comida (
    id          SERIAL PRIMARY KEY,
    nombre      VARCHAR(100) NOT NULL UNIQUE,
    slug        VARCHAR(100) NOT NULL UNIQUE,
    descripcion VARCHAR(255)
);

INSERT INTO tipos_comida (nombre, slug, descripcion) VALUES
    ('Desayunos',           'desayunos',            'Recetas para el desayuno'),
    ('Comidas Principales', 'comidas-principales',   'Platos principales'),
    ('Postres',             'postres',              'Postres y dulces'),
    ('Sopas',               'sopas',                'Sopas y cremas'),
    ('Ensaladas',           'ensaladas',            'Ensaladas');

-- --------------------------------------------
-- Recipes
-- --------------------------------------------
CREATE TABLE recetas (
    id                      SERIAL PRIMARY KEY,
    tipo_id                 INT NOT NULL REFERENCES tipos_comida(id),
    nombre                  VARCHAR(255) NOT NULL,
    numero_comensales       INT DEFAULT 0,
    dificultad              SMALLINT DEFAULT 1 CHECK (dificultad BETWEEN 1 AND 3),
    tiene_recomendaciones   BOOLEAN DEFAULT FALSE,
    recomendaciones         TEXT,
    created_at              TIMESTAMPTZ DEFAULT now()
);

-- --------------------------------------------
-- Ingredients
-- --------------------------------------------
CREATE TABLE ingredientes (
    id          SERIAL PRIMARY KEY,
    receta_id   INT NOT NULL REFERENCES recetas(id) ON DELETE CASCADE,
    nombre      VARCHAR(255) NOT NULL,
    cantidad    VARCHAR(50),
    unidad      VARCHAR(50)
);

-- --------------------------------------------
-- Steps
-- --------------------------------------------
CREATE TABLE pasos (
    id          SERIAL PRIMARY KEY,
    receta_id   INT NOT NULL REFERENCES recetas(id) ON DELETE CASCADE,
    numero      INT NOT NULL,
    descripcion TEXT NOT NULL
);

-- ============================================
-- Seed data
-- ============================================

-- ===========================================
-- 1. Albóndigas con salsa española y arroz
--    (Comidas Principales, tipo_id = 2)
-- ===========================================
WITH r AS (
    INSERT INTO recetas (tipo_id, nombre, numero_comensales, dificultad, tiene_recomendaciones)
    VALUES (2, 'Albóndigas con salsa española y arroz', 0, 3, FALSE)
    RETURNING id
),
ins_ingredientes AS (
    INSERT INTO ingredientes (receta_id, nombre, cantidad, unidad)
    SELECT r.id, v.nombre, v.cantidad, v.unidad
    FROM r, (VALUES
        ('carne picada',    NULL, NULL),
        ('pan rallado',     NULL, NULL),
        ('huevo',           '1',   'unidad'),
        ('perejil',         NULL, NULL),
        ('leche',           NULL, NULL),
        ('cebolla',         NULL, NULL),
        ('zanahoria',       NULL, NULL),
        ('ajo',             NULL, NULL),
        ('harina',          '1',   'cda'),
        ('vino tinto',      '200', 'ml'),
        ('caldo',           '400', 'ml'),
        ('arroz blanco',    NULL, NULL),
        ('sal',             NULL, NULL)
    ) AS v(nombre, cantidad, unidad)
)
INSERT INTO pasos (receta_id, numero, descripcion)
SELECT r.id, v.numero, v.descripcion
FROM r, (VALUES
    (1, 'Mezclar ingredientes de las albóndigas y formarlas.'),
    (2, 'Freír las albóndigas y reservar.'),
    (3, 'Preparar la salsa sofriendo verduras y harina.'),
    (4, 'Añadir vino y caldo, cocinar y triturar.'),
    (5, 'Añadir albóndigas y servir con arroz.')
) AS v(numero, descripcion);

-- ===========================================
-- 2. Bizcocho de yogur
--    (Postres, tipo_id = 3)
-- ===========================================
WITH r AS (
    INSERT INTO recetas (tipo_id, nombre, numero_comensales, dificultad, tiene_recomendaciones)
    VALUES (3, 'Bizcocho de yogur', 10, 2, FALSE)
    RETURNING id
),
ins_ingredientes AS (
    INSERT INTO ingredientes (receta_id, nombre, cantidad, unidad)
    SELECT r.id, v.nombre, v.cantidad, v.unidad
    FROM r, (VALUES
        ('huevos',                      '3',   'unidad'),
        ('yogur',                       '1',   'unidad'),
        ('aceite',                      '1',   'vaso'),
        ('azúcar',                      '2',   'vasos'),
        ('harina',                      '3',   'vasos'),
        ('levadura',                    '1',   'sobre'),
        ('ralladura de limón',          NULL,  NULL),
        ('azúcar glas',                 NULL,  NULL),
        ('mantequilla para el molde',   NULL,  NULL)
    ) AS v(nombre, cantidad, unidad)
)
INSERT INTO pasos (receta_id, numero, descripcion)
SELECT r.id, v.numero, v.descripcion
FROM r, (VALUES
    (1, 'Precalentar el horno.'),
    (2, 'Mezclar ingredientes líquidos.'),
    (3, 'Añadir ingredientes secos.'),
    (4, 'Verter en molde.'),
    (5, 'Hornear hasta que esté hecho.'),
    (6, 'Dejar enfriar y decorar.')
) AS v(numero, descripcion);

-- ===========================================
-- 3. Brownie
--    (Postres, tipo_id = 3)
-- ===========================================
WITH r AS (
    INSERT INTO recetas (tipo_id, nombre, numero_comensales, dificultad, tiene_recomendaciones)
    VALUES (3, 'Brownie', 0, 2, FALSE)
    RETURNING id
),
ins_ingredientes AS (
    INSERT INTO ingredientes (receta_id, nombre, cantidad, unidad)
    SELECT r.id, v.nombre, v.cantidad, v.unidad
    FROM r, (VALUES
        ('chocolate negro', '200', 'g'),
        ('mantequilla',     '250', 'g'),
        ('azúcar',          '300', 'g'),
        ('huevos',          '4',   'unidad'),
        ('harina',          '150', 'g')
    ) AS v(nombre, cantidad, unidad)
)
INSERT INTO pasos (receta_id, numero, descripcion)
SELECT r.id, v.numero, v.descripcion
FROM r, (VALUES
    (1, 'Fundir chocolate y mantequilla.'),
    (2, 'Mezclar huevos y azúcar.'),
    (3, 'Unir ambas mezclas.'),
    (4, 'Añadir harina.'),
    (5, 'Hornear.')
) AS v(numero, descripcion);

-- ===========================================
-- 4. Tarta de Queso Clásica
--    (Postres, tipo_id = 3)
-- ===========================================
WITH r AS (
    INSERT INTO recetas (tipo_id, nombre, numero_comensales, dificultad, tiene_recomendaciones)
    VALUES (3, 'Tarta de Queso Clásica', 8, 3, FALSE)
    RETURNING id
),
ins_ingredientes AS (
    INSERT INTO ingredientes (receta_id, nombre, cantidad, unidad)
    SELECT r.id, v.nombre, v.cantidad, v.unidad
    FROM r, (VALUES
        ('queso Philadelphia', '900',       'g'),
        ('crème fraîche',      '200',       'ml'),
        ('azúcar',             '250',       'g'),
        ('huevos',             '3',         'unidad'),
        ('harina',             '3',         'cda'),
        ('galletas',           '1',         'paquete'),
        ('mantequilla',        'al gusto',  'para la base')
    ) AS v(nombre, cantidad, unidad)
)
INSERT INTO pasos (receta_id, numero, descripcion)
SELECT r.id, v.numero, v.descripcion
FROM r, (VALUES
    (1, 'Triturar las galletas y mezclar con mantequilla derretida.'),
    (2, 'Verter la mezcla en el molde y congelar hasta que la masa se endurezca.'),
    (3, 'Mezclar el queso Philadelphia con el azúcar.'),
    (4, 'Añadir la crème fraîche y batir.'),
    (5, 'Añadir los huevos de uno en uno, mezclando con una cuchara.'),
    (6, 'Incorporar la harina, mezclar y verter sobre la base.'),
    (7, 'Hornear 10 minutos a 180 °C. Después bajar a 150 °C y hornear 30 minutos más.'),
    (8, 'Apagar el horno con el pastel dentro. Sacar tras 2 horas.'),
    (9, 'Dejar enfriar en la nevera (mínimo 12 horas).')
) AS v(numero, descripcion);

-- ===========================================
-- 5. Tiramisú
--    (Postres, tipo_id = 3)
-- ===========================================
WITH r AS (
    INSERT INTO recetas (tipo_id, nombre, numero_comensales, dificultad, tiene_recomendaciones)
    VALUES (3, 'Tiramisú', 6, 3, TRUE)
    RETURNING id
),
ins_ingredientes AS (
    INSERT INTO ingredientes (receta_id, nombre, cantidad, unidad)
    SELECT r.id, v.nombre, v.cantidad, v.unidad
    FROM r, (VALUES
        ('queso mascarpone',       '500', 'g'),
        ('huevos',                 '2',   'unidad'),
        ('café',                   '350', 'ml'),
        ('azúcar',                 '80',  'g'),
        ('cacao en polvo',         NULL,  NULL),
        ('bizcochos de soletilla', '20',  'unidad')
    ) AS v(nombre, cantidad, unidad)
)
INSERT INTO pasos (receta_id, numero, descripcion)
SELECT r.id, v.numero, v.descripcion
FROM r, (VALUES
    (1,  'Preparar el café y dejar enfriar.'),
    (2,  'Separar claras y yemas.'),
    (3,  'Montar claras.'),
    (4,  'Batir yemas con azúcar.'),
    (5,  'Añadir mascarpone.'),
    (6,  'Incorporar claras.'),
    (7,  'Mojar bizcochos.'),
    (8,  'Montar capas.'),
    (9,  'Repetir capas.'),
    (10, 'Espolvorear cacao.'),
    (11, 'Reposar en frío.'),
    (12, 'Servir.')
) AS v(numero, descripcion);

-- ===========================================
-- 6. Crema de setas
--    (Sopas, tipo_id = 4)
-- ===========================================
WITH r AS (
    INSERT INTO recetas (tipo_id, nombre, numero_comensales, dificultad, tiene_recomendaciones)
    VALUES (4, 'Crema de setas', 4, 2, FALSE)
    RETURNING id
),
ins_ingredientes AS (
    INSERT INTO ingredientes (receta_id, nombre, cantidad, unidad)
    SELECT r.id, v.nombre, v.cantidad, v.unidad
    FROM r, (VALUES
        ('setas',       '400', 'g'),
        ('cebolla',     '1',   'unidad'),
        ('ajo',         '2',   'dientes'),
        ('mantequilla', '40',  'g'),
        ('caldo',       '750', 'ml'),
        ('nata',        '150', 'ml'),
        ('sal',         NULL,  NULL),
        ('pimienta',    NULL,  NULL)
    ) AS v(nombre, cantidad, unidad)
)
INSERT INTO pasos (receta_id, numero, descripcion)
SELECT r.id, v.numero, v.descripcion
FROM r, (VALUES
    (1, 'Sofreír cebolla y ajo.'),
    (2, 'Añadir setas y cocinar.'),
    (3, 'Incorporar caldo.'),
    (4, 'Triturar.'),
    (5, 'Añadir nata.'),
    (6, 'Ajustar sal.'),
    (7, 'Servir.')
) AS v(numero, descripcion);

-- ===========================================
-- 7. Ensalada de pasta y pollo
--    (Ensaladas, tipo_id = 5)
-- ===========================================
WITH r AS (
    INSERT INTO recetas (tipo_id, nombre, numero_comensales, dificultad, tiene_recomendaciones)
    VALUES (5, 'Ensalada de pasta y pollo', 0, 1, FALSE)
    RETURNING id
),
ins_ingredientes AS (
    INSERT INTO ingredientes (receta_id, nombre, cantidad, unidad)
    SELECT r.id, v.nombre, v.cantidad, v.unidad
    FROM r, (VALUES
        ('pasta corta',        '300', 'g'),
        ('pechuga de pollo',   '1',   'unidad'),
        ('tomates cherry',     NULL,  NULL),
        ('pepino',             NULL,  NULL),
        ('aceitunas negras',   NULL,  NULL),
        ('queso feta',         '100', 'g'),
        ('aceite',             '3',   'cda'),
        ('mostaza',            '1',   'cdita')
    ) AS v(nombre, cantidad, unidad)
)
INSERT INTO pasos (receta_id, numero, descripcion)
SELECT r.id, v.numero, v.descripcion
FROM r, (VALUES
    (1, 'Cocer la pasta.'),
    (2, 'Cocinar el pollo.'),
    (3, 'Mezclar ingredientes.'),
    (4, 'Preparar el aliño.'),
    (5, 'Servir fría.')
) AS v(numero, descripcion);

-- ============================================
-- Useful views
-- ============================================

CREATE VIEW recetas_por_tipo AS
SELECT
    t.nombre    AS tipo,
    r.id        AS receta_id,
    r.nombre    AS receta,
    r.dificultad,
    r.numero_comensales,
    (SELECT COUNT(*) FROM ingredientes i WHERE i.receta_id = r.id) AS num_ingredientes,
    (SELECT COUNT(*) FROM pasos p WHERE p.receta_id = r.id)        AS num_pasos
FROM recetas r
JOIN tipos_comida t ON r.tipo_id = t.id
ORDER BY t.nombre, r.nombre;

-- ============================================
-- Row Level Security (Supabase best practice)
-- ============================================
ALTER TABLE tipos_comida ENABLE ROW LEVEL SECURITY;
ALTER TABLE recetas ENABLE ROW LEVEL SECURITY;
ALTER TABLE ingredientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE pasos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read tipos_comida" ON tipos_comida FOR SELECT USING (true);
CREATE POLICY "Public read recetas" ON recetas FOR SELECT USING (true);
CREATE POLICY "Public read ingredientes" ON ingredientes FOR SELECT USING (true);
CREATE POLICY "Public read pasos" ON pasos FOR SELECT USING (true);
