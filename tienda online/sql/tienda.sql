CREATE DATABASE tienda;

USE tienda;

CREATE TABLE productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100),
  descripcion TEXT,
  precio DECIMAL(10,2),
  imagen VARCHAR(255)
);

-- Ejemplo de productos
INSERT INTO productos (nombre, descripcion, precio, imagen) VALUES
('Camisa Pokémon', 'Camisa con estampado retro', 25.99, 'img/camisa.png'),
('Poster Charizard', 'Poster edición limitada', 14.50, 'img/poster.png'),
('Set Stickers', 'Pack de 50 calcomanías', 9.99, 'img/stickers.png');
CREATE TABLE pedidos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre_cliente VARCHAR(100),
  email_cliente VARCHAR(100),
  productos TEXT,
  total DECIMAL(10,2),
  fecha DATETIME DEFAULT CURRENT_TIMESTAMP
);
