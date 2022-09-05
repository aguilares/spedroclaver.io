-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-01-2022 a las 19:46:25
-- Versión del servidor: 10.4.18-MariaDB
-- Versión de PHP: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bd001`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `area`
--

CREATE TABLE `area` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `id_unidad` int(11) DEFAULT NULL,
  `estado` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `area`
--

INSERT INTO `area` (`id`, `nombre`, `id_unidad`, `estado`) VALUES
(1, 'ADMINISTRACION', 1, 1),
(2, 'TIC', 2, 1),
(3, 'SERVICIOS COMPLEMENTARIOS', 3, 1),
(4, 'SERVICIOS PRIMARIOS', 4, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `camas`
--

CREATE TABLE `camas` (
  `id` int(11) NOT NULL,
  `numero` int(11) NOT NULL,
  `descripcion` varchar(300) NOT NULL,
  `estado` int(11) NOT NULL DEFAULT 1,
  `id_sala` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `camas`
--

INSERT INTO `camas` (`id`, `numero`, `descripcion`, `estado`, `id_sala`) VALUES
(1, 1, 'COMPLETAR CARACTERISTICAS', 1, 4),
(2, 2, 'COMPLETAR CARACTERISTICAS', 1, 4),
(3, 1, 'COMPLETAR CARACTERISTICAS', 1, 2),
(4, 2, 'COMPLETAR CARACTERISTICAS', 1, 2),
(5, 1, 'COMPLETAR CARACTERISTICAS', 1, 1),
(6, 2, 'COMPLETAR CARACTERISTICAS', 1, 1),
(7, 1, 'COMPLETAR CARACTERISTICAS', 1, 3),
(8, 2, 'COMPLETAR CARACTERISTICAS', 1, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `centro`
--

CREATE TABLE `centro` (
  `id` int(11) NOT NULL,
  `nombre` text NOT NULL DEFAULT 'actualizar nombre',
  `id_distrito` int(11) NOT NULL DEFAULT 0,
  `estado` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `centro`
--

INSERT INTO `centro` (`id`, `nombre`, `id_distrito`, `estado`) VALUES
(1, 'SAN PEDRO CLAVER- LAJASTAMBO', 1, 1),
(3, 'HOSPITAL SAN LUCAS', 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `distrito`
--

CREATE TABLE `distrito` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `id_municipio` int(11) NOT NULL,
  `estado` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `distrito`
--

INSERT INTO `distrito` (`id`, `nombre`, `id_municipio`, `estado`) VALUES
(1, 'DISTRITO 2', 1, 1),
(2, 'DISTRITO 1', 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gestion`
--

CREATE TABLE `gestion` (
  `id` int(11) NOT NULL,
  `gestion` int(11) NOT NULL,
  `estado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `gestion`
--

INSERT INTO `gestion` (`id`, `gestion`, `estado`) VALUES
(1, 2021, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lab_bsangre`
--

CREATE TABLE `lab_bsangre` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `disponible` tinyint(1) NOT NULL DEFAULT 1,
  `id_centro` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lab_examenes`
--

CREATE TABLE `lab_examenes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `disponible` tinyint(1) NOT NULL DEFAULT 1,
  `id_centro` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lab_hemoterapia`
--

CREATE TABLE `lab_hemoterapia` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `disponible` tinyint(1) NOT NULL DEFAULT 1,
  `id_centro` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `municipio`
--

CREATE TABLE `municipio` (
  `id` int(11) NOT NULL,
  `id_red` int(11) DEFAULT NULL,
  `nombre` text DEFAULT NULL,
  `estado` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `municipio`
--

INSERT INTO `municipio` (`id`, `id_red`, `nombre`, `estado`) VALUES
(1, 1, 'OROPEZA', 1),
(2, 34, 'SAN LUCAS', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nivel`
--

CREATE TABLE `nivel` (
  `id` int(11) NOT NULL,
  `nivel` int(11) DEFAULT NULL,
  `des` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `nivel`
--

INSERT INTO `nivel` (`id`, `nivel`, `des`) VALUES
(1, 1, 'NIVEL HOSPITAL'),
(2, 2, 'NIVEL DISTRITO'),
(3, 3, 'NIVEL MUNICIPIO'),
(4, 4, 'NIVEL RED');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paciente`
--

CREATE TABLE `paciente` (
  `id` int(11) NOT NULL,
  `ci` varchar(15) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `apellido1` varchar(40) NOT NULL,
  `apellido2` varchar(40) NOT NULL,
  `sexo` char(1) NOT NULL,
  `fechaNac` date NOT NULL,
  `celular` varchar(15) NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `id_red` int(11) NOT NULL DEFAULT 1,
  `validacion` tinyint(1) NOT NULL,
  `estado` tinyint(1) NOT NULL,
  `idPersonal` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `paciente`
--

INSERT INTO `paciente` (`id`, `ci`, `nombre`, `apellido1`, `apellido2`, `sexo`, `fechaNac`, `celular`, `telefono`, `direccion`, `id_red`, `validacion`, `estado`, `idPersonal`) VALUES
(104, '10101095', 'JOEL', 'Aguilar', 'Torres', 'M', '1997-08-07', '7346834', 'NO TIENE', 'PALACIO TAMBO Z/HOSPITAL MUNICIPAL', 1, 0, 1, 2),
(135, '13616192', 'CARMEN', 'Aguilar', 'Torres', 'M', '1997-08-07', '7346834', 'NO TIENE', 'PALACIO TAMBO Z/HOSPITAL MUNICIPAL', 1, 0, 1, 2),
(141, '13616101', 'GANTIER', 'MODRIC', 'JAMESINO', 'M', '1997-08-11', '7346834', 'NO TIENE', 'PALACIO TAMBO Z/HOSPITAL MUNICIPAL', 1, 0, 1, 6),
(142, '78726871', 'WILMER', 'AGUILAR', 'TORRES', 'M', '2001-01-03', '7346834', '0000', 'PALACION TAMBO Z/INTERNADO', 1, 0, 1, 2),
(151, '13616191', 'ABRAHAN', 'AGUILAR', 'TORRES', 'M', '1997-08-06', '7346834', '0000', 'PALACIO TAMB Z/HOSPITAL MUNICIPAL', 1, 0, 1, 2),
(156, '13616196', 'ABRAHAN', 'AGUILAR', 'TORRES', 'M', '1997-08-06', '7346834', '0000', 'PALACIO TAMB Z/HOSPITAL MUNICIPAL', 1, 0, 1, 2),
(157, '131232211', 'GUSTAVO', 'AGUILAR', 'PRUEBA', 'M', '1090-12-12', '78787872', '73468197', 'SUCRE BOLIVIA', 1, 0, 1, 2),
(158, '6767787', 'GUSTAVO', 'AGUILAR', 'TORRES', 'M', '0078-08-07', '78787872', '73468197', 'SUCRE BOLIVIA', 1, 0, 1, 2),
(159, '13123227', 'ALFREDO', 'BIGRABRIEL', 'HOPS', 'M', '1990-12-12', '78787872', '73468197', 'SUCRE BOLIVIA', 1, 0, 1, 2),
(163, '23232323', 'GUIDO', 'AGUILAR', 'TORRES', 'M', '2007-07-08', '67652504', '0000', 'PALACIO TAMBO C/NUEVO AMANECER S/N', 34, 0, 1, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personal`
--

CREATE TABLE `personal` (
  `id` int(11) NOT NULL,
  `ci` varchar(20) NOT NULL,
  `nombre` varchar(30) DEFAULT NULL,
  `apellido1` varchar(30) DEFAULT NULL,
  `apellido2` varchar(30) DEFAULT NULL,
  `profesion` varchar(50) DEFAULT NULL,
  `direccion` varchar(70) DEFAULT NULL,
  `celular` varchar(15) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `id_area` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `personal`
--

INSERT INTO `personal` (`id`, `ci`, `nombre`, `apellido1`, `apellido2`, `profesion`, `direccion`, `celular`, `telefono`, `id_area`) VALUES
(1, '7878771', 'JUAN JOSE', 'CAHIWARA', 'SANTOS', 'MEDICO GENERAL', 'PARQUE MULTIPOSITO Z/ARANJUAEZ', '688788889', '676766', 1),
(2, '87878798', 'LUCI', 'CONRADO', 'ARANDO', 'ING. DE SISTEMAS', 'SUCRE CALLE SAN AGUSTIN Z/MERCADO CAMPESINO', '73468197', '676766', 2),
(3, '76767677', 'MERY ', 'FLORES', 'EZPINOZA', 'ENDOCRINOLOGO', 'SUCRE CALLE JUNIN #566 Z/CENTRAL', '73468197', '676766', 1),
(4, '54654576', 'SAIT', 'OVANDO', 'CAMPOS', 'MEDICO GENERAL', 'SUCRE CALLE EEUU Z/BARRIO PETROLERO', '73468197', '676766', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reds`
--

CREATE TABLE `reds` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `reds`
--

INSERT INTO `reds` (`id`, `nombre`) VALUES
(1, 'RED 1 SUCRE'),
(7, 'RED 2 TARABUCO'),
(27, 'RED 3 PADILLA'),
(34, 'RED VI CAMARGO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `id` int(11) NOT NULL,
  `numero` int(11) NOT NULL,
  `nombre` text DEFAULT NULL,
  `id_nivel` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`id`, `numero`, `nombre`, `id_nivel`) VALUES
(1, 1, 'hospital', 1),
(7, 2, 'complementarios', 1),
(8, 3, 'servicios\r\n', 1),
(10, 4, 'tic', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `salas`
--

CREATE TABLE `salas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `id_area` int(11) NOT NULL,
  `estado` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `salas`
--

INSERT INTO `salas` (`id`, `nombre`, `id_area`, `estado`) VALUES
(1, 'UTI', 4, 1),
(2, 'MUJERES', 4, 1),
(3, 'VARONES', 4, 1),
(4, 'COVID-19', 4, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicio_primarios`
--

CREATE TABLE `servicio_primarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `id_centro` int(11) NOT NULL,
  `estado` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sesiones`
--

CREATE TABLE `sesiones` (
  `id` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `fecha` datetime NOT NULL,
  `token` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `sesiones`
--

INSERT INTO `sesiones` (`id`, `id_user`, `fecha`, `token`) VALUES
(820, 2, '2022-01-27 14:35:05', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoiZ3VzdCIsInNpc3RlbWEiOiJTRUdMIiwiaWF0IjoxNjQzMzA4NTA1LCJleHAiOjE2NDMzOTQ5MDV9.8k4sW_oSi9PisbTOj_SPu5lQB5eX_3JZ66aJThEFav4');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sistema`
--

CREATE TABLE `sistema` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `descrip` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `sistema`
--

INSERT INTO `sistema` (`id`, `nombre`, `descrip`) VALUES
(1, 'SEGL', 'SOLICITUD EXAMENES DE GABINETE Y SOLICITUD DE EXAMENES DE LABORATORIO Y SERVICIO DE SANGRE SEGURA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `unidad`
--

CREATE TABLE `unidad` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `id_centro` int(11) DEFAULT NULL,
  `estado` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `unidad`
--

INSERT INTO `unidad` (`id`, `nombre`, `id_centro`, `estado`) VALUES
(1, 'administrativa', 1, 1),
(2, 'TIC', 1, 1),
(3, 'ESPECIALIDADES', 1, 1),
(4, 'MEDICINA GENERAL', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_sist`
--

CREATE TABLE `user_sist` (
  `id` int(11) NOT NULL,
  `idUser` int(11) DEFAULT NULL,
  `idSist` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `user_sist`
--

INSERT INTO `user_sist` (`id`, `idUser`, `idSist`) VALUES
(1, 2, 1),
(2, 6, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `usuario` varchar(20) NOT NULL,
  `pass` varchar(200) DEFAULT NULL,
  `id_personal` int(11) DEFAULT NULL,
  `id_nivel` int(11) DEFAULT NULL,
  `id_rol` int(11) DEFAULT NULL,
  `id_gestion` int(11) DEFAULT NULL,
  `estado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `usuario`, `pass`, `id_personal`, `id_nivel`, `id_rol`, `id_gestion`, `estado`) VALUES
(2, 'gust', '81dc9bdb52d04dc20036dbd8313ed055', 1, 1, 7, 1, 1),
(4, 'luci', '81dc9bdb52d04dc20036dbd8313ed055', 2, 4, 10, 1, 1),
(5, 'said', '81dc9bdb52d04dc20036dbd8313ed055', 4, 1, 8, 1, 1),
(6, 'mery', '81dc9bdb52d04dc20036dbd8313ed055', 3, 2, 7, 1, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `area`
--
ALTER TABLE `area`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_unidad` (`id_unidad`);

--
-- Indices de la tabla `camas`
--
ALTER TABLE `camas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_sala` (`id_sala`);

--
-- Indices de la tabla `centro`
--
ALTER TABLE `centro`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_distrito` (`id_distrito`);

--
-- Indices de la tabla `distrito`
--
ALTER TABLE `distrito`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_municipio` (`id_municipio`),
  ADD KEY `fk_id_distrito` (`id`);

--
-- Indices de la tabla `gestion`
--
ALTER TABLE `gestion`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `lab_bsangre`
--
ALTER TABLE `lab_bsangre`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`),
  ADD KEY `id_centro` (`id_centro`);

--
-- Indices de la tabla `lab_examenes`
--
ALTER TABLE `lab_examenes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`),
  ADD KEY `id_centro` (`id_centro`);

--
-- Indices de la tabla `lab_hemoterapia`
--
ALTER TABLE `lab_hemoterapia`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`),
  ADD KEY `id_centro` (`id_centro`);

--
-- Indices de la tabla `municipio`
--
ALTER TABLE `municipio`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_red` (`id_red`);

--
-- Indices de la tabla `nivel`
--
ALTER TABLE `nivel`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
-- Indices de la tabla `paciente`
--
ALTER TABLE `paciente`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_reds` (`id_red`),
  ADD KEY `fkPersonal` (`idPersonal`);

--
-- Indices de la tabla `personal`
--
ALTER TABLE `personal`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ci` (`ci`),
  ADD KEY `id_area` (`id_area`);

--
-- Indices de la tabla `reds`
--
ALTER TABLE `reds`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_reds` (`id`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_id_nivel` (`id_nivel`);

--
-- Indices de la tabla `salas`
--
ALTER TABLE `salas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`),
  ADD KEY `id_area` (`id_area`);

--
-- Indices de la tabla `servicio_primarios`
--
ALTER TABLE `servicio_primarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`),
  ADD KEY `id_centro` (`id_centro`);

--
-- Indices de la tabla `sesiones`
--
ALTER TABLE `sesiones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`);

--
-- Indices de la tabla `sistema`
--
ALTER TABLE `sistema`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`),
  ADD KEY `index_sis` (`id`);

--
-- Indices de la tabla `unidad`
--
ALTER TABLE `unidad`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_centro` (`id_centro`);

--
-- Indices de la tabla `user_sist`
--
ALTER TABLE `user_sist`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUser` (`idUser`),
  ADD KEY `idSist` (`idSist`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `usuario` (`usuario`),
  ADD KEY `id_gestion` (`id_gestion`),
  ADD KEY `id_personal` (`id_personal`),
  ADD KEY `id_nivel` (`id_nivel`),
  ADD KEY `id_rol` (`id_rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `area`
--
ALTER TABLE `area`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `camas`
--
ALTER TABLE `camas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `centro`
--
ALTER TABLE `centro`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `distrito`
--
ALTER TABLE `distrito`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `gestion`
--
ALTER TABLE `gestion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `lab_bsangre`
--
ALTER TABLE `lab_bsangre`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `lab_examenes`
--
ALTER TABLE `lab_examenes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `lab_hemoterapia`
--
ALTER TABLE `lab_hemoterapia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `municipio`
--
ALTER TABLE `municipio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `nivel`
--
ALTER TABLE `nivel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `paciente`
--
ALTER TABLE `paciente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=165;

--
-- AUTO_INCREMENT de la tabla `personal`
--
ALTER TABLE `personal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `reds`
--
ALTER TABLE `reds`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `salas`
--
ALTER TABLE `salas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `servicio_primarios`
--
ALTER TABLE `servicio_primarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `sesiones`
--
ALTER TABLE `sesiones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=821;

--
-- AUTO_INCREMENT de la tabla `sistema`
--
ALTER TABLE `sistema`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `unidad`
--
ALTER TABLE `unidad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `user_sist`
--
ALTER TABLE `user_sist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `area`
--
ALTER TABLE `area`
  ADD CONSTRAINT `area_ibfk_1` FOREIGN KEY (`id_unidad`) REFERENCES `unidad` (`id`);

--
-- Filtros para la tabla `camas`
--
ALTER TABLE `camas`
  ADD CONSTRAINT `camas_ibfk_1` FOREIGN KEY (`id_sala`) REFERENCES `salas` (`id`);

--
-- Filtros para la tabla `centro`
--
ALTER TABLE `centro`
  ADD CONSTRAINT `fk_id_distrito` FOREIGN KEY (`id_distrito`) REFERENCES `distrito` (`id`);

--
-- Filtros para la tabla `distrito`
--
ALTER TABLE `distrito`
  ADD CONSTRAINT `distrito_ibfk_1` FOREIGN KEY (`id_municipio`) REFERENCES `municipio` (`id`);

--
-- Filtros para la tabla `lab_bsangre`
--
ALTER TABLE `lab_bsangre`
  ADD CONSTRAINT `lab_bsangre_ibfk_1` FOREIGN KEY (`id_centro`) REFERENCES `centro` (`id`);

--
-- Filtros para la tabla `lab_examenes`
--
ALTER TABLE `lab_examenes`
  ADD CONSTRAINT `lab_examenes_ibfk_1` FOREIGN KEY (`id_centro`) REFERENCES `centro` (`id`);

--
-- Filtros para la tabla `lab_hemoterapia`
--
ALTER TABLE `lab_hemoterapia`
  ADD CONSTRAINT `lab_hemoterapia_ibfk_1` FOREIGN KEY (`id_centro`) REFERENCES `centro` (`id`);

--
-- Filtros para la tabla `municipio`
--
ALTER TABLE `municipio`
  ADD CONSTRAINT `municipio_ibfk_1` FOREIGN KEY (`id_red`) REFERENCES `reds` (`id`);

--
-- Filtros para la tabla `paciente`
--
ALTER TABLE `paciente`
  ADD CONSTRAINT `fkPersonal` FOREIGN KEY (`idPersonal`) REFERENCES `usuario` (`id`),
  ADD CONSTRAINT `fk_reds` FOREIGN KEY (`id_red`) REFERENCES `reds` (`id`);

--
-- Filtros para la tabla `personal`
--
ALTER TABLE `personal`
  ADD CONSTRAINT `personal_ibfk_1` FOREIGN KEY (`id_area`) REFERENCES `area` (`id`);

--
-- Filtros para la tabla `rol`
--
ALTER TABLE `rol`
  ADD CONSTRAINT `fk_id_nivel` FOREIGN KEY (`id_nivel`) REFERENCES `nivel` (`id`);

--
-- Filtros para la tabla `salas`
--
ALTER TABLE `salas`
  ADD CONSTRAINT `salas_ibfk_1` FOREIGN KEY (`id_area`) REFERENCES `area` (`id`);

--
-- Filtros para la tabla `servicio_primarios`
--
ALTER TABLE `servicio_primarios`
  ADD CONSTRAINT `servicio_primarios_ibfk_1` FOREIGN KEY (`id_centro`) REFERENCES `centro` (`id`);

--
-- Filtros para la tabla `sesiones`
--
ALTER TABLE `sesiones`
  ADD CONSTRAINT `sesiones_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `unidad`
--
ALTER TABLE `unidad`
  ADD CONSTRAINT `unidad_ibfk_1` FOREIGN KEY (`id_centro`) REFERENCES `centro` (`id`);

--
-- Filtros para la tabla `user_sist`
--
ALTER TABLE `user_sist`
  ADD CONSTRAINT `user_sist_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `usuario` (`id`),
  ADD CONSTRAINT `user_sist_ibfk_2` FOREIGN KEY (`idSist`) REFERENCES `sistema` (`id`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`id_gestion`) REFERENCES `gestion` (`id`),
  ADD CONSTRAINT `usuario_ibfk_2` FOREIGN KEY (`id_personal`) REFERENCES `personal` (`id`),
  ADD CONSTRAINT `usuario_ibfk_3` FOREIGN KEY (`id_nivel`) REFERENCES `nivel` (`id`),
  ADD CONSTRAINT `usuario_ibfk_4` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id`);

DELIMITER $$
--
-- Eventos
--
CREATE DEFINER=`root`@`localhost` EVENT `close_expired_campaigns` ON SCHEDULE EVERY 1 MINUTE STARTS '2021-10-01 00:00:01' ON COMPLETION PRESERVE ENABLE DO DELETE FROM sesiones
where
DATE_ADD(fecha, INTERVAL 1440 MINUTE)<NOW()$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
