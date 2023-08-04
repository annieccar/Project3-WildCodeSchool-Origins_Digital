-- SQLBook: Code
-- Active: 1689174540931@@127.0.0.1@3306@origins_digital

-- SQLBook: Code

DROP TABLE IF EXISTS `video_has_carrousel`;

DROP TABLE IF EXISTS `video_has_playlist`;

DROP TABLE IF EXISTS `video`;

DROP TABLE IF EXISTS `category`;

DROP TABLE IF EXISTS `playlist`;

DROP TABLE IF EXISTS `carrousel`;

DROP TABLE IF EXISTS `user`;

DROP TABLE IF EXISTS `usertype`;

CREATE TABLE
    IF NOT EXISTS `category` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `name` VARCHAR(64) NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE
    IF NOT EXISTS `video` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `url` VARCHAR(255) NOT NULL,
        `name` VARCHAR(64) NOT NULL,
        `duration` INT NOT NULL,
        `details` VARCHAR(45) NOT NULL,
        `category_id` INT NOT NULL,
        PRIMARY KEY (`id`),
        CONSTRAINT `fk_video_category` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE
    IF NOT EXISTS `usertype` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `type_name` VARCHAR(64) NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE
    IF NOT EXISTS `user` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `firstname` VARCHAR(64) NOT NULL,
        `lastname` VARCHAR(64) NOT NULL,
        `birthdate` DATE NOT NULL,
        `gender` VARCHAR(45) NOT NULL,
        `email` VARCHAR(128) NOT NULL,
        `password` VARCHAR(64) NOT NULL,
        `profileimage` VARCHAR(255) NULL,
        `usertype_id` INT NOT NULL,
        PRIMARY KEY (`id`),
        CONSTRAINT `fk_user_usertype` FOREIGN KEY (`usertype_id`) REFERENCES `usertype` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE
    IF NOT EXISTS `playlist` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `name` VARCHAR(64) NOT NULL,
        `user_id` INT NOT NULL,
        PRIMARY KEY (`id`),
        CONSTRAINT `fk_playlist_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE
    IF NOT EXISTS `video_has_playlist` (
        `video_id` INT NOT NULL,
        `playlist_id` INT NOT NULL,
        PRIMARY KEY (`video_id`, `playlist_id`),
        CONSTRAINT `fk_video_has_playlist_video` FOREIGN KEY (`video_id`) REFERENCES `video` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT `fk_video_has_playlist_playlist` FOREIGN KEY (`playlist_id`) REFERENCES `playlist` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE
    IF NOT EXISTS `carrousel` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `carrousel_name` VARCHAR(64) NOT NULL,
        `carrousel_length` INT NOT NULL,
        `user_id` INT NOT NULL,
        PRIMARY KEY (`id`),
        CONSTRAINT `fk_Carrousel_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE
    IF NOT EXISTS `video_has_carrousel` (
        `video_id` INT NOT NULL,
        `carrousel_id` INT NOT NULL,
        PRIMARY KEY (`video_id`, `carrousel_id`),
        CONSTRAINT `fk_video_has_Carrousel_video` FOREIGN KEY (`video_id`) REFERENCES `video` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT `fk_video_has_Carrousel_Carrousel` FOREIGN KEY (`carrousel_id`) REFERENCES `carrousel` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;