# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.5.5-10.3.27-MariaDB-0+deb10u1)
# Database: coding
# Generation Time: 2021-01-19 19:32:55 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table attivita
# ------------------------------------------------------------

CREATE TABLE `attivita` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `data` date DEFAULT NULL,
  `annoaccademico` smallint(4) DEFAULT NULL,
  `tipologia` varchar(15) DEFAULT NULL,
  `titolo` varchar(200) DEFAULT NULL,
  `argomento` varchar(200) DEFAULT NULL,
  `numero` int(11) DEFAULT NULL,
  `ore` smallint(6) DEFAULT NULL,
  `cb` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `pk` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


# Dump of table attivitaesercizi
# ------------------------------------------------------------

CREATE TABLE `attivitaesercizi` (
  `attivitafk` int(11) NOT NULL,
  `esercizifk` int(11) NOT NULL,
  `ordine` int(11) DEFAULT NULL,
  `proposto` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`attivitafk`,`esercizifk`),
  KEY `attivitafk` (`attivitafk`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


# Dump of table esami
# ------------------------------------------------------------

CREATE TABLE `esami` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `data` date DEFAULT NULL,
  `anno` year(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


# Dump of table esercizi
# ------------------------------------------------------------

DROP TABLE IF EXISTS `esercizi`;

CREATE TABLE `esercizi` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `titolo` varchar(300) DEFAULT NULL,
  `testo` longtext DEFAULT NULL,
  `argomento` text DEFAULT NULL,
  `colore` char(7) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table eserciziesame
# ------------------------------------------------------------

CREATE TABLE `eserciziesamea` (
  `esercizifk` int(11) DEFAULT NULL,
  `esamifk` int(11) DEFAULT NULL,
  `ordine` tinyint(11) DEFAULT NULL,
  `punti` tinyint(4) DEFAULT NULL,
  PRIMARY KEY `id` (`esercizifk`,`esamifk`),
  CONSTRAINT `esercizifk` FOREIGN KEY (`esercizifk`) REFERENCES `esercizi` (`id`),
  CONSTRAINT `esamifk` FOREIGN KEY (`esamifk`) REFERENCES `esami` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


# Dump of table soluzioni
# ------------------------------------------------------------

CREATE TABLE `soluzioni` (
  `id` int(4) unsigned NOT NULL AUTO_INCREMENT COMMENT 'identificativo',
  `codice` longtext NOT NULL COMMENT 'codice',
  `note` text DEFAULT NULL COMMENT 'commenti',
  `main` longtext DEFAULT NULL,
  `esercizifk` int(4) unsigned NOT NULL COMMENT 'esercizio',
  `daevitare` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `esercizifk` (`esercizifk`),
  CONSTRAINT `esercizifk` FOREIGN KEY (`esercizifk`) REFERENCES `esercizi` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Soluzioni';


# Dump of table soluzionichiamante
# ------------------------------------------------------------

CREATE TABLE `soluzionichiamante` (
  `id` int(4) unsigned NOT NULL AUTO_INCREMENT COMMENT 'identificativo',
  `codice` mediumblob NOT NULL COMMENT 'Full source code',
  `soluzionifk` int(4) unsigned NOT NULL COMMENT 'esercizio',
  PRIMARY KEY (`id`),
  KEY `soluzionifk` (`soluzionifk`),
  CONSTRAINT `soluzionifk` FOREIGN KEY (`soluzionifk`) REFERENCES `soluzioni` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Chiamante della soluzione per il collaudo';


# Dump of table tipologiaattivita
# ------------------------------------------------------------

CREATE TABLE `tipologiaattivita` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `tipologia` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

