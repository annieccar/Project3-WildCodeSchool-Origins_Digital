-- Active: 1689178327332@@127.0.0.1@3306@origins_digital

INSERT INTO
    origins_digital.category (id, name)
VALUES (1, 'landscape'), (2, 'animals'), (3, 'sports'), (4, 'cars'), (5, 'people'), (6, 'cities');

INSERT INTO
    origins_digital.video (
        id,
        name,
        file_name,
        duration,
        details,
        category_id
    )
VALUES (
        1,
        'Sea',
        'sea',
        '00:00:10',
        'sea details',
        1
    ), (
        2,
        'Sunset',
        'sunset',
        '00:00:11',
        'sunset details',
        1
    ), (
        3,
        'Snail',
        'snail',
        '00:00:40',
        'snail details',
        2
    ), (
        4,
        'Sunflowers',
        'sunflowers',
        '00:00:40',
        'sunflowers details',
        1
    ), (
        5,
        'Roundabout',
        'roundabout',
        '00:00:17',
        'roundabout details',
        5
    ), (
        6,
        'Lotus Flowers',
        'lotus_flowers',
        '00:00:28',
        'lotus flowers details',
        1
    ), (
        7,
        'Hydrangea',
        'hydrangea',
        '00:00:50',
        'hydrangea details',
        1
    ), (
        8,
        'Fog',
        'fog',
        '00:00:41',
        'fog details',
        1
    ), (
        9,
        'Airport',
        'airport',
        '00:00:11',
        'People walking in an airport',
        5
    ), (
        10,
        'Aurora Borealis',
        'aurora_borealis',
        '00:00:30',
        'Aurora Borealis in the sky',
        1
    ), (
        11,
        'Birds',
        'birds',
        '00:00:30',
        'Birds flying in the sky',
        2
    ), (
        12,
        'BMW',
        'bmw',
        '00:00:10',
        'BMW',
        4
    ), (
        13,
        'Boxing',
        'boxing',
        '00:00:23',
        'Boxer in action',
        3
    ), (
        14,
        'Bugatti',
        'bugatti',
        '00:00:24',
        'Bugatti car',
        4
    ), (
        15,
        'Butterfly',
        'butterfly',
        '00:00:29',
        'Butterfly on a flower',
        2
    ), (
        16,
        'Carpenter',
        'carpenter',
        '00:00:08',
        'Carpenter at work',
        5
    ), (
        17,
        'Cat',
        'cat',
        '00:00:09',
        'Black and white cat',
        2
    ), (
        18,
        'Chess',
        'chess',
        '00:00:06',
        'Chess game',
        5
    ), (
        19,
        'Cook',
        'cook',
        '00:00:10',
        'Cook making pasta',
        5
    ), (
        20,
        'Corvette',
        'corvette',
        '00:00:07',
        'Corvette car',
        4
    ), (
        21,
        'Cows',
        'cows',
        '00:00:14',
        'Cows in a field',
        2
    ), (
        22,
        'Dog',
        'dog',
        '00:00:14',
        'Dog sleeping',
        2
    ), (
        23,
        'Dubrovnik',
        'dubrovnik',
        '00:00:07',
        'Dubrovnik City',
        6
    ), (
        24,
        'Fish',
        'fish',
        '00:00:19',
        'Colorful fishes in the sea',
        2
    ), (
        25,
        'Frog',
        'frog',
        '00:00:14',
        'Green frog',
        2
    ), (
        26,
        'Guitarist',
        'guitarist',
        '00:00:14',
        'A man playing guitar',
        5
    ), (
        27,
        'Homework',
        'homework',
        '00:00:11',
        'A girl doing homeworks',
        5
    ), (
        28,
        'Kitesurf',
        'kitesurf',
        '00:00:51',
        'Kitesurfer in action',
        3
    ), (
        29,
        'Lamb',
        'lamb',
        '00:00:18',
        'Mama sheep and its lamb in the field',
        2
    ), (
        30,
        'Lunch',
        'lunch',
        '00:00:35',
        'People eating lunch in a restaurant',
        5
    ), (
        31,
        'Mercedes',
        'mercedes',
        '00:00:18',
        'Mercedes car',
        4
    ), (
        32,
        'Mountains',
        'mountain',
        '00:00:19',
        'Dramatic drone video of mountains',
        1
    ), (
        33,
        'New-York City',
        'new_york_city',
        '00:00:14',
        'NYC at night',
        6
    ), (
        34,
        'Parrot',
        'parrot',
        '00:00:15',
        'Beautiful red parrot',
        2
    ), (
        35,
        'People',
        'people',
        '00:00:09',
        'People walking in a city',
        5
    ), (
        36,
        'Porsche',
        'porsche',
        '00:00:50',
        'Beautiful Porsche',
        4
    ), (
        37,
        'Porsche Car',
        'porsche2',
        '00:01:06',
        'Porsche ready to start',
        4
    ), (
        38,
        'Race car',
        'race_car',
        '00:00:09',
        'Car in a race',
        3
    ), (
        39,
        'Rafting',
        'rafting',
        '00:00:12',
        'A group in a rafting expedition',
        3
    ), (
        40,
        'Seoul',
        'seoul',
        '00:00:14',
        'Views of Seoul city',
        6
    ), (
        41,
        'Skateboarder',
        'skateboarder',
        '00:00:09',
        'Skateboarder doing tricks',
        3
    ), (
        42,
        'Snow',
        'snow',
        '00:00:45',
        'Snow falling in a forest',
        1
    ), (
        43,
        'Soccer',
        'soccer',
        '00:00:17',
        'Soccer game',
        3
    ), (
        44,
        'Motorbike',
        'stunt_motorbike',
        '00:00:09',
        'Two bikers doing a stunt',
        3
    ), (
        45,
        'Surf',
        'surf',
        '00:00:14',
        'Surfer on a wave',
        3
    ), (
        46,
        'Tornado',
        'tornado',
        '00:00:20',
        'A tornado approaching',
        1
    ), (
        47,
        'Waterfall',
        'waterfall',
        '00:00:18',
        'Drone view of a beautiful waterfall',
        1
    ), (
        48,
        'Wolf',
        'wolf',
        '00:00:26',
        'Wolf in the wild',
        2
    ), (
        49,
        'Yoga',
        'yoga',
        '00:00:14',
        'Women doing Yoga',
        3
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

INSERT INTO
    `carousel` (
        `carousel_name`,
        `carousel_length`
    )
VALUES ('Hero Slider', 5), ('landscape', 10), ('sports', 10), ('cars', 10), ('animals', 10), ('people', 10), ('cities', 10);

INSERT INTO
    origins_digital.video_has_carousel (id, video_id, carousel_id)
VALUES (1, 2, 2), (2, 6, 2), (3, 7, 2), (4, 8, 2), (5, 10, 2), (6, 32, 2), (7, 42, 2), (8, 46, 2), (9, 11, 5), (10, 17, 5), (11, 21, 5), (12, 22, 5), (13, 24, 5), (14, 29, 5), (15, 34, 5), (16, 48, 5), (17, 13, 3), (18, 28, 3), (19, 38, 3), (20, 41, 3), (21, 43, 3), (22, 44, 3), (23, 45, 3), (24, 49, 3), (25, 12, 4), (26, 14, 4), (27, 20, 4), (28, 31, 4), (29, 36, 4), (30, 37, 4), (31, 5, 6), (32, 9, 6), (33, 16, 6), (34, 19, 6), (35, 26, 6), (36, 27, 6), (37, 30, 6), (38, 35, 6), (39, 23, 7), (40, 33, 7), (41, 40, 7), (42, 10, 1), (43, 4, 1), (44, 32, 1), (45, 42, 1), (46, 47, 1), (47, 24, 1);