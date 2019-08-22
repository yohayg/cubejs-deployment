USE super_ads;
CREATE TABLE `tracking_clicks`
(
    `created_at`  timestamp,
    `create_id`   int(11) NOT NULL,
    `campaign`    int(11) NOT NULL,
    `app_id`      int(11) NOT NULL,
    `ad_set_id`   int(11) NOT NULL,
    `ch_id`       int(11) NOT NULL,
    `user_id`     int(11) NOT NULL,
    `offer_id`    int(11) NOT NULL,
    `creative_id` int(11) NOT NULL,
    `click_id`    int(11) NOT NULL,
    PRIMARY KEY (`click_id`)
);

CREATE TABLE `tracking_impressions`
(
    `created_at`    timestamp,
    `create_id`     int(11) NOT NULL,
    `campaign`      int(11) NOT NULL,
    `app_id`        int(11) NOT NULL,
    `ad_set_id`     int(11) NOT NULL,
    `ch_id`         int(11) NOT NULL,
    `user_id`       int(11) NOT NULL,
    `offer_id`      int(11) NOT NULL,
    `creative_id`   int(11) NOT NULL,
    `impression_id` int(11) NOT NULL,
    PRIMARY KEY (`impression_id`)
);

CREATE TABLE `events`
(
    `event_time`  DATETIME NOT NULL,
    `event_time_ts` bigint(20) NOT NULL,
    `request_id`  varchar(50) DEFAULT NULL,
    `placement_id` varchar(50) DEFAULT NULL,
    `app_id`      varchar(50) NOT NULL,
    `ad_set_id`   varchar(50) NOT NULL,
    `ch_id`       varchar(50) NOT NULL,
    `user_id`     varchar(50) NOT NULL,
    `offer_id`    varchar(50) NOT NULL,
    `creative_id` varchar(50) NOT NULL,
    `event_id`    varchar(50) NOT NULL,
    `event_type`  varchar(50) NOT NULL,
    `geo`         varchar(10) DEFAULT NULL,
    `device`      varchar(50) DEFAULT NULL,
    `os_version`  varchar(50) DEFAULT NULL,
    `device_ip`   varchar(50) DEFAULT NULL,
    `ua`          text CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
    KEY (`event_id`) USING CLUSTERED COLUMNSTORE
);
