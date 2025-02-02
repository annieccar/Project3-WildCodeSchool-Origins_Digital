-- Active: 1689178327332@@127.0.0.1@3306@origins_digital

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
        `file_name` VARCHAR(64) NOT NULL,
        `duration` TIME NOT NULL,
        `details` VARCHAR(45) NULL,
        `category_id` INT NULL,
        PRIMARY KEY (`id`),
        CONSTRAINT `fk_video_category` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
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
        `hashedPassword` VARCHAR(255) NOT NULL,
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
        CONSTRAINT `fk_playlist_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE
    IF NOT EXISTS `video_has_playlist` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `video_id` INT NOT NULL,
        `playlist_id` INT NOT NULL,
        PRIMARY KEY (`id`),
        CONSTRAINT `fk_video_has_playlist_video` FOREIGN KEY (`video_id`) REFERENCES `video` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT `fk_video_has_playlist_playlist` FOREIGN KEY (`playlist_id`) REFERENCES `playlist` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE
    IF NOT EXISTS `carousel` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `title` VARCHAR(64) NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE
    IF NOT EXISTS `video_has_carousel` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `video_id` INT NOT NULL,
        `carousel_id` INT NOT NULL,
        PRIMARY KEY (`id`),
        CONSTRAINT `fk_video_has_carousel_video` FOREIGN KEY (`video_id`) REFERENCES `video` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT `fk_video_has_carousel_carousel` FOREIGN KEY (`carousel_id`) REFERENCES `carousel` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

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
        '$argon2id$v=19$m=65536,t=5,p=1$jI/jg+K7bqT+6dG5MyJSJQ$CJX6X75h9mvgebCxlZNlLA51M/kBf7ZzW0weaHIjVR0',
        3
    ), (
        'KillianC',
        'Killian',
        'C.',
        '2000-03-03',
        'male',
        'killian@toto.com',
        '$argon2id$v=19$m=65536,t=5,p=1$jI/jg+K7bqT+6dG5MyJSJQ$CJX6X75h9mvgebCxlZNlLA51M/kBf7ZzW0weaHIjVR0',
        2
    ), (
        'DamienM',
        'Damien',
        'M.',
        '2000-02-02',
        'male',
        'damien@toto.com',
        '$argon2id$v=19$m=65536,t=5,p=1$jI/jg+K7bqT+6dG5MyJSJQ$CJX6X75h9mvgebCxlZNlLA51M/kBf7ZzW0weaHIjVR0',
        2
    ), (
        'ThibautP',
        'Thibaut',
        'P.',
        '2000-04-04',
        'male',
        'thibaut@toto.com',
        '$argon2id$v=19$m=65536,t=5,p=1$jI/jg+K7bqT+6dG5MyJSJQ$CJX6X75h9mvgebCxlZNlLA51M/kBf7ZzW0weaHIjVR0',
        1
    );