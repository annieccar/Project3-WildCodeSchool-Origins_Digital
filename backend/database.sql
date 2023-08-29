-- SQLBook: Code

-- Active: 1689174540931@@127.0.0.1@3306@origins_digital

-- SQLBook: Code

DROP TABLE IF EXISTS `video_has_carousel`;

DROP TABLE IF EXISTS `video_has_playlist`;

DROP TABLE IF EXISTS `video`;

DROP TABLE IF EXISTS `category`;

DROP TABLE IF EXISTS `playlist`;

DROP TABLE IF EXISTS `carousel`;

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
        `name` VARCHAR(64) NOT NULL,
        `duration` INT NOT NULL,
        `details` VARCHAR(45) NULL,
        `category_id` INT NULL,
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
        `username` VARCHAR(64) NOT NULL,
        `firstname` VARCHAR(64) NOT NULL,
        `lastname` VARCHAR(64) NOT NULL,
        `birthdate` DATE NOT NULL,
        `gender` VARCHAR(45) NOT NULL,
        `email` VARCHAR(128) NOT NULL,
        `hashedpassword` VARCHAR(255) NOT NULL,
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
        `id` INT NOT NULL AUTO_INCREMENT,
        `video_id` INT NOT NULL,
        `playlist_id` INT NOT NULL,
        PRIMARY KEY (`id`),
        CONSTRAINT `fk_video_has_playlist_video` FOREIGN KEY (`video_id`) REFERENCES `video` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT `fk_video_has_playlist_playlist` FOREIGN KEY (`playlist_id`) REFERENCES `playlist` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE
    IF NOT EXISTS `carousel` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `carousel_name` VARCHAR(64) NOT NULL,
        `carousel_length` INT NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE
    IF NOT EXISTS `video_has_carousel` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `video_id` INT NOT NULL,
        `carousel_id` INT NOT NULL,
        PRIMARY KEY (`id`),
        CONSTRAINT `fk_video_has_carousel_video` FOREIGN KEY (`video_id`) REFERENCES `video` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT `fk_video_has_carousel_carousel` FOREIGN KEY (`carousel_id`) REFERENCES `carousel` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

INSERT INTO `category` (`name`) VALUES ('nature'), ('landscapes');

INSERT INTO
    `video` (
        `name`,
        `duration`,
        `category_id`
    )
VALUES ('sea', 10, 2), ('sunset', 11, 2), ('snail', 40, 1), ('sunflowers', 40, 1), ('roundabout', 17, 2), ('lotus_flowers', 28, 1), ('hydrangea', 50, 1), ('fog', 41, 2);

INSERT INTO
    `usertype` (`type_name`)
VALUES ('Free'), ('Premium'), ('Administrator');

INSERT INTO
    `user` (
        `username`,
        `firstname`,
        `lastname`,
        `birthdate`,
        `gender`,
        `email`,
        `hashedpassword`,
        `usertype_id`
    )
VALUES (
        'AnnieC',
        'Annie',
        'C.',
        '2000-01-01',
        'female',
        'annie@toto.com',
        'password',
        3
    ), (
        'KillianC',
        'Killian',
        'C.',
        '2000-03-03',
        'male',
        'killian@toto.com',
        'password',
        2
    ), (
        'DamienM',
        'Damien',
        'M.',
        '2000-02-02',
        'male',
        'damien@toto.com',
        'password',
        2
    ), (
        'ThibautP',
        'Thibaut',
        'P.',
        '2000-04-04',
        'male',
        'thibaut@toto.com',
        'password',
        1
    );

INSERT INTO
    `carousel` (
        `carousel_name`,
        `carousel_length`
    )
VALUES ('Hero Slider', 5);

INSERT INTO
    `video_has_carousel` (`video_id`, `carousel_id`)
VALUES (1, 1), (2, 1), (3, 1), (4, 1), (5, 1);