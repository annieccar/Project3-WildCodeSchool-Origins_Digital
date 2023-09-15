-- Active: 1689174540931@@127.0.0.1@3306@origins_digital

INSERT INTO `category` (`name`) VALUES ('nature'), ('landscapes');

INSERT INTO
    `video` (
        `name`,
        `file_name`,
        `duration`,
        `details`,
        `category_id`
    )
VALUES (
        'sea',
        'sea',
        10,
        'sea details',
        2
    ), (
        'sunset',
        'sunset',
        11,
        'sunset details',
        2
    ), (
        'snail',
        'snail',
        40,
        'snail details',
        1
    ), (
        'sunflowers',
        'sunflowers',
        40,
        'sunflowers details',
        1
    ), (
        'roundabout',
        'roundabout',
        17,
        'roundabout details',
        2
    ), (
        'lotus_flowers',
        'lotus_flowers',
        28,
        'lotus flowers details',
        1
    ), (
        'hydrangea',
        'hydrangea',
        50,
        'hydrangea details',
        1
    ), (
        'fog',
        'fog',
        41,
        'fog details',
        2
    );

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
        '$argon2id$v=19$m=65536,t=5,p=1$42bG/LgUck6OQjfWBg3YCA$sbfjzLw09tkiz/xHdEJ5KmCGY0H9L24r3lbAy46xDuY',
        3
    ), (
        'KillianC',
        'Killian',
        'C.',
        '2000-03-03',
        'male',
        'killian@toto.com',
        '$argon2id$v=19$m=65536,t=5,p=1$42bG/LgUck6OQjfWBg3YCA$sbfjzLw09tkiz/xHdEJ5KmCGY0H9L24r3lbAy46xDuY',
        2
    ), (
        'DamienM',
        'Damien',
        'M.',
        '2000-02-02',
        'male',
        'damien@toto.com',
        '$argon2id$v=19$m=65536,t=5,p=1$42bG/LgUck6OQjfWBg3YCA$sbfjzLw09tkiz/xHdEJ5KmCGY0H9L24r3lbAy46xDuY',
        2
    ), (
        'ThibautP',
        'Thibaut',
        'P.',
        '2000-04-04',
        'male',
        'thibaut@toto.com',
        '$argon2id$v=19$m=65536,t=5,p=1$42bG/LgUck6OQjfWBg3YCA$sbfjzLw09tkiz/xHdEJ5KmCGY0H9L24r3lbAy46xDuY',
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