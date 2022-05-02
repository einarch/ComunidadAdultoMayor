-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-05-2022 a las 03:44:02
-- Versión del servidor: 10.4.18-MariaDB
-- Versión de PHP: 8.0.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cam`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actividades`
--

CREATE TABLE `actividades` (
  `id` int(4) NOT NULL,
  `nombreusuario` varchar(30) COLLATE latin1_spanish_ci NOT NULL,
  `actividad` varchar(30) COLLATE latin1_spanish_ci NOT NULL,
  `fechahora` timestamp NOT NULL DEFAULT current_timestamp(),
  `ubicacion` varchar(30) COLLATE latin1_spanish_ci NOT NULL,
  `descripcion` text COLLATE latin1_spanish_ci DEFAULT NULL,
  `numusuarios` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Volcado de datos para la tabla `actividades`
--

INSERT INTO `actividades` (`id`, `nombreusuario`, `actividad`, `fechahora`, `ubicacion`, `descripcion`, `numusuarios`) VALUES
(1, 'Einar Chuquimia', 'Encuentro Religioso', '2022-04-12 15:14:53', 'Don Bosco Fatima', 'Por Viernes Santo se realiza la invitacion publica a nuestro encuentro anual', 26),
(2, 'Gabriel Mercado', 'Visita de museos', '2022-04-12 15:17:28', 'Plazuela Cobija', 'En la plaza estará un bus para trasladarse, se ruega puntualidad.', 22),
(3, 'Javier Fernandez', 'Taller de Teatro', '2022-04-12 15:18:38', 'Teatro Capitol, entre Ecuador ', 'Es costo de entrada es gratuito, cupos limitados.', 32),
(7, 'Kevin Chura', 'Vision para todos', '2022-04-12 19:29:21', 'Plazuela La Torre', 'Se realizaran lentes para todas las personas aultos mayores', 15);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publicaciones`
--

CREATE TABLE `publicaciones` (
  `id` int(11) NOT NULL,
  `nombre` varchar(30) COLLATE latin1_spanish_ci NOT NULL,
  `fechahora` timestamp NOT NULL DEFAULT current_timestamp(),
  `descripcion` text COLLATE latin1_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Volcado de datos para la tabla `publicaciones`
--

INSERT INTO `publicaciones` (`id`, `nombre`, `fechahora`, `descripcion`) VALUES
(1, 'Saul Meneses Borda', '2022-04-12 15:34:15', 'Hoy fue un gran día, pude disfrutar del paisaje y la compañia de mi familia. Hoy fue un gran día, pude disfrutar del paisaje y la compañia de mi familia. Hoy fue un gran día, pude disfrutar del paisaje y la compañia de mi familia. Hoy fue un gran día, pude disfrutar del paisaje y la compañia de mi familia. Hoy fue un gran día, pude disfrutar del paisaje y la compañia de mi familia. '),
(2, 'Rimer Rosa', '2022-04-12 19:42:08', 'Me visitaron mis nietos fue un agradable dia. Me visitaron mis nietos fue un agradable dia.Me visitaron mis nietos fue un agradable dia.Me visitaron mis nietos fue un agradable dia.Me visitaron mis nietos fue un agradable dia.Me visitaron mis nietos fue un agradable dia.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_usuario`
--

CREATE TABLE `tipo_usuario` (
  `idTipoUsuario` int(128) NOT NULL,
  `etiquetaTipoUsuario` varchar(128) NOT NULL,
  `descripcionTipoUsuario` varchar(256) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tipo_usuario`
--

INSERT INTO `tipo_usuario` (`idTipoUsuario`, `etiquetaTipoUsuario`, `descripcionTipoUsuario`) VALUES
(1, 'Adulto Mayor', 'Acceso total'),
(2, 'General', 'Acceso parcial\r\n');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL COMMENT 'Identificador único para el usuario',
  `usuario` varchar(30) NOT NULL COMMENT 'correo electrónico',
  `clave` varchar(130) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellidos` varchar(128) NOT NULL,
  `idTipoUsuario` int(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `clave`, `nombre`, `apellidos`, `idTipoUsuario`) VALUES
(2, 'pedro@gmail.com', '$2y$10$eONkKS9GTRF5qrTfHCrN0O.djRyo8gEeJeDCqeS3ZCTC6M7f/hDl.', 'Pedro', 'Rojas Alcocer', 2),
(42, 'jime@correo.de', '$2y$10$Yas93XMTccL6iqY14uxBa.qA/S31QCJ4y9qy2Y0atX/erIsydbhRu', 'Jimena', 'Mora Torres', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `voluntarios`
--

CREATE TABLE `voluntarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(30) COLLATE latin1_spanish_ci NOT NULL,
  `ciudad` varchar(30) COLLATE latin1_spanish_ci NOT NULL,
  `telefono` varchar(8) COLLATE latin1_spanish_ci NOT NULL,
  `diasdisp` varchar(30) COLLATE latin1_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Volcado de datos para la tabla `voluntarios`
--

INSERT INTO `voluntarios` (`id`, `nombre`, `ciudad`, `telefono`, `diasdisp`) VALUES
(1, 'Arleth Andia Quinteros', 'Cochabamba', '75849601', 'De lunes a jueves'),
(2, 'Carlos Gutierrez', 'Oruro', '65847593', 'Sabado y Domingo'),
(3, 'Kevin Chura', 'La Paz', '78523694', 'Miercoles');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `actividades`
--
ALTER TABLE `actividades`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  ADD PRIMARY KEY (`idTipoUsuario`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `voluntarios`
--
ALTER TABLE `voluntarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `actividades`
--
ALTER TABLE `actividades`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  MODIFY `idTipoUsuario` int(128) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Identificador único para el usuario', AUTO_INCREMENT=115;

--
-- AUTO_INCREMENT de la tabla `voluntarios`
--
ALTER TABLE `voluntarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
