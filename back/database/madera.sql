CREATE TABLE `administrator` (
  `id` int(11) UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) UNIQUE NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp
);

CREATE TABLE `stockist` (
  `id` int(11) UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_administrator` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) UNIQUE NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp
);

CREATE TABLE `stocks` (
  `id` int(11) UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_stockist` int(11) NOT NULL,
  `id_component` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp
);

CREATE TABLE `commercial` (
  `id` int(11) UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_administrator` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) UNIQUE NOT NULL,
  `phone_number` varchar(10) NOT NULL COMMENT 'Numéro de téléphone FR (06) sans espaces',
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp
);

CREATE TABLE `client` (
  `id` int(11) UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_commercial` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `postal_code` varchar(5) NOT NULL,
  `adress_line_1` varchar(255) NOT NULL,
  `adress_line_2` varchar(255) COMMENT 'Précision adresse',
  `phone_number` varchar(10) NOT NULL COMMENT 'Numéro de téléphone FR (06) sans espaces',
  `email` varchar(255) UNIQUE NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp
);

CREATE TABLE `quotation` (
  `id` int(11) UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_commercial` int(11) NOT NULL,
  `id_client` int(11) NOT NULL,
  `status` ENUM ('waiting', 'accepted', 'denied'),
  `price` float NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp
);

CREATE TABLE `quotation_module` (
  `id` int(11) UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_quotation` int(11) NOT NULL,
  `id_module` int(11) NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp
);

CREATE TABLE `order` (
  `id` int(11) UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_quotation` int(11) NOT NULL,
  `status` ENUM ('waiting', 'in_production', 'in_assembly', 'in_delivery', 'installed'),
  `total_paid` float NOT NULL DEFAULT 0
);

CREATE TABLE `payments` (
  `id` int(11) UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_order` int(11) NOT NULL,
  `type` ENUM ('at_signature', 'at_construction_licence_obtention', 'at_site_opening', 'at_foundation_completion', 'at_walls_completion', 'at_water_air_put_out', 'at_equipment_work_completion', 'at_key_handing'),
  `currently_paid` float NOT NULL,
  `left_to_pay` float NOT NULL,
  `status` ENUM ('waiting', 'in_production', 'in_assembly', 'in_delivery', 'installed'),
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp
);

CREATE TABLE `module` (
  `id` int(11) UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `label` varchar(255) NOT NULL,
  `reference` varchar(255) NOT NULL,
  `feature` varchar(255) NOT NULL,
  `usage_unit` ENUM ('centimeter', 'square_meter', 'linear_meter', 'unit') NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp
);

CREATE TABLE `module_component` (
  `id` int(11) UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_module` int(11) NOT NULL,
  `id_component` int(11) NOT NULL,
  `value` int(11) NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp
);

CREATE TABLE `component` (
  `id` int(11) UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_provider` int(11) NOT NULL,
  `label` varchar(255) NOT NULL,
  `reference` varchar(255) NOT NULL,
  `feature` varchar(255) NOT NULL,
  `usage_unit` ENUM ('centimeter', 'square_meter', 'linear_meter', 'unit') NOT NULL,
  `price` float NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp
);

CREATE TABLE `provider` (
  `id` int(11) UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_stockist` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `reference` varchar(255) NOT NULL,
  `logo` varchar(255) NOT NULL COMMENT 'URL vers le logo du fournisseur',
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp
);

ALTER TABLE `stockist` ADD FOREIGN KEY (`id_administrator`) REFERENCES `administrator` (`id`);

ALTER TABLE `stocks` ADD FOREIGN KEY (`id_stockist`) REFERENCES `stockist` (`id`);

ALTER TABLE `stocks` ADD FOREIGN KEY (`id_component`) REFERENCES `component` (`id`);

ALTER TABLE `commercial` ADD FOREIGN KEY (`id_administrator`) REFERENCES `administrator` (`id`);

ALTER TABLE `client` ADD FOREIGN KEY (`id_commercial`) REFERENCES `commercial` (`id`);

ALTER TABLE `quotation` ADD FOREIGN KEY (`id_commercial`) REFERENCES `commercial` (`id`);

ALTER TABLE `quotation` ADD FOREIGN KEY (`id_client`) REFERENCES `client` (`id`);

ALTER TABLE `quotation_module` ADD FOREIGN KEY (`id_quotation`) REFERENCES `quotation` (`id`);

ALTER TABLE `quotation_module` ADD FOREIGN KEY (`id_module`) REFERENCES `module` (`id`);

ALTER TABLE `order` ADD FOREIGN KEY (`id_quotation`) REFERENCES `quotation` (`id`);

ALTER TABLE `payments` ADD FOREIGN KEY (`id_order`) REFERENCES `order` (`id`);

ALTER TABLE `module_component` ADD FOREIGN KEY (`id_module`) REFERENCES `module` (`id`);

ALTER TABLE `module_component` ADD FOREIGN KEY (`id_component`) REFERENCES `component` (`id`);

ALTER TABLE `component` ADD FOREIGN KEY (`id_provider`) REFERENCES `provider` (`id`);

ALTER TABLE `provider` ADD FOREIGN KEY (`id_stockist`) REFERENCES `stockist` (`id`);
