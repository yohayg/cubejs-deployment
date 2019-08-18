import pymysql.cursors
import datetime
from random import randint


def clicks():
    sql_clicks = "INSERT INTO " \
                 "tracking_clicks (" \
                 "created_at, create_id, campaign, app_id, ad_set_id, " \
                 "ch_id, user_id, offer_id, creative_id, click_id ) " \
                 "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
    click_id = 0
    minutes = 0
    hour = 0
    day = 1
    for _ in range(3000):
        minutes = minutes + randint(1, 5)
    if minutes >= 60:
        minutes = 0
    hour = hour + 1
    if hour == 24:
        hour = 0
    day = day + 1
    click_id = click_id + 1
    print(click_id)
    cursor.execute(sql_clicks,
               (datetime.datetime(2019, 8, day, hour, minutes, 0), 1, 1, 1, 1, 1, 1, randint(0, 1), 1, click_id))


def impressions():
    sql_impressions = "INSERT INTO tracking_impressions (" \
                      "created_at, create_id, campaign, app_id, ad_set_id, " \
                      "ch_id, user_id, offer_id, creative_id, impression_id )  " \
                      "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
    impression_id = 0
    minutes = 0
    hour = 0
    day = 1
    for _ in range(3000):
        minutes = minutes + randint(1, 5)
        if minutes >= 60:
            minutes = 0
            hour = hour + 1
        if hour == 24:
            hour = 0
            day = day + 1
        impression_id = impression_id + 1
        print(impression_id)
        cursor.execute(sql_impressions, (
        datetime.datetime(2019, 8, day, hour, minutes, 0), 1, 1, 1, 1, 1, 1, randint(0, 1), 1, impression_id))


def getGeo():
    index = randint(0, 2)
    return geos[index]


def getDevice():
    index = randint(0, 1)
    return devices[index]


def events():
    sql_events = "INSERT INTO events (" \
                 "event_time, create_id, campaign, app_id, ad_set_id, " \
                 "ch_id, user_id, offer_id, creative_id, event_id, event_type, geo, device, os_version, device_ip, ua)  " \
                 "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
    event_id = 0
    minutes = 0
    hour = 0
    day = 1
    for _ in range(3000):
        minutes = minutes + randint(1, 5)
        if minutes >= 60:
            minutes = 0
            hour = hour + 1
        if hour == 24:
            hour = 0
            day = day + 1
        event_id = event_id + 1
        print(event_id)
        cursor.execute(sql_events, (
        datetime.datetime(2019, 8, day, hour, minutes, 0), 1, 1, 1, 1, 1, randint(0, 10), randint(0, 1), 1, event_id, randint(0, 1), getGeo(),
        getDevice(), "", "", ""))


# Connect to the database
connection = pymysql.connect(host='localhost',
                             user='root',
                             password='',
                             db='super_ads',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)

try:

    geos = ["US", "CN", "IL"]

    devices = ["Android", "Iphone"]

    with connection.cursor() as cursor:
        # Read a single record
        sql = 'delete from tracking_clicks'
        cursor.execute(sql)
        sql = 'delete from tracking_impressions'
        cursor.execute(sql)
        sql = 'delete from events'
        cursor.execute(sql)

    connection.commit()

    with connection.cursor() as cursor:
        events()

    connection.commit()

    with connection.cursor() as cursor:
        # Read a single record
        sql = 'select count(*) from events'
        cursor.execute(sql)
#         sql = "SELECT `id`, `password` FROM `users2` WHERE `email`=%s"
#         cursor.execute(sql, ('webmaster@python.org',))
        result = cursor.fetchone()
        print(result)
finally:
    connection.close()