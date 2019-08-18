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
    `event_time`  DATETIME,
    `create_id`   int(11) NOT NULL,
    `campaign`    int(11) NOT NULL,
    `app_id`      int(11) NOT NULL,
    `ad_set_id`   int(11) NOT NULL,
    `ch_id`       int(11) NOT NULL,
    `user_id`     int(11) NOT NULL,
    `offer_id`    int(11) NOT NULL,
    `creative_id` int(11) NOT NULL,
    `event_id`    int(11) NOT NULL,
    `event_type`  int(11) NOT NULL,   //all event types
    `geo`         varchar(5) NOT NULL,
    `device`      varchar(20) NOT NULL,
    `os_version`  varchar(11) NOT NULL,
    `device_ip`   varchar(45) NOT NULL,
    `ua`          varchar(50) NOT NULL,
    KEY (`event_id`) USING CLUSTERED COLUMNSTORE
);