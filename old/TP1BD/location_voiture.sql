-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 24 oct. 2024 à 14:56
-- Version du serveur : 5.7.17
-- Version de PHP : 8.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `location_voiture`
--

-- --------------------------------------------------------

--
-- Structure de la table `clients`
--

CREATE TABLE `clients` (
  `ncin` int(11) NOT NULL,
  `num_permis` varchar(20) COLLATE utf8mb4_latvian_ci NOT NULL,
  `nom_prenom` varchar(20) COLLATE utf8mb4_latvian_ci NOT NULL,
  `adresse` varchar(20) COLLATE utf8mb4_latvian_ci NOT NULL,
  `tel` varchar(20) COLLATE utf8mb4_latvian_ci NOT NULL,
  `date_naissance` date NOT NULL,
  `email` varchar(20) COLLATE utf8mb4_latvian_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_latvian_ci;

--
-- Déchargement des données de la table `clients`
--

INSERT INTO `clients` (`ncin`, `num_permis`, `nom_prenom`, `adresse`, `tel`, `date_naissance`, `email`) VALUES
(1000, '10', 'johnes', '100rue', '0610', '1990-10-10', 'johnes@gmail.com'),
(2000, '20', 'Patrik', '2000rue', '0620', '1990-11-21', 'Patrik@gmail.com');

-- --------------------------------------------------------

--
-- Structure de la table `locations`
--

CREATE TABLE `locations` (
  `id_location` int(11) NOT NULL,
  `immatriculation` varchar(20) COLLATE utf8mb4_latvian_ci NOT NULL,
  `ncin` int(11) NOT NULL,
  `duree_location` int(11) NOT NULL,
  `date_location` date NOT NULL,
  `prix_location` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_latvian_ci;

--
-- Déchargement des données de la table `locations`
--

INSERT INTO `locations` (`id_location`, `immatriculation`, `ncin`, `duree_location`, `date_location`, `prix_location`) VALUES
(1111, '1011001101', 1000, 1, '2024-10-10', 6000);

-- --------------------------------------------------------

--
-- Structure de la table `voiture`
--

CREATE TABLE `voiture` (
  `immatriculation` int(11) NOT NULL,
  `marque` varchar(20) COLLATE utf8mb4_latvian_ci NOT NULL,
  `model` varchar(20) COLLATE utf8mb4_latvian_ci NOT NULL,
  `carburant` int(11) NOT NULL,
  `kilometrage` int(11) NOT NULL,
  `date_circulation` date NOT NULL,
  `couleur` char(20) COLLATE utf8mb4_latvian_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_latvian_ci;

--
-- Déchargement des données de la table `voiture`
--

INSERT INTO `voiture` (`immatriculation`, `marque`, `model`, `carburant`, `kilometrage`, `date_circulation`, `couleur`) VALUES
(1011001101, 'amg', 'one', 80, 79000, '2015-10-06', 'ROUGE');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`ncin`);

--
-- Index pour la table `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`id_location`),
  ADD KEY `immatriculation` (`immatriculation`),
  ADD KEY `ncin` (`ncin`);

--
-- Index pour la table `voiture`
--
ALTER TABLE `voiture`
  ADD PRIMARY KEY (`immatriculation`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
