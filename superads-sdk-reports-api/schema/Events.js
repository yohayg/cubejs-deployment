cube(`Events`, {
    sql: `SELECT * FROM super_ads.events`,

    joins: {},

    measures: {
        count: {
            type: `count`,
            drillMembers: [eventTime, eventTimeTS, requestId, appId, adSetId, chId, userId, offerId, creativeId, eventId, eventType, geo, device, osVersion, deviceIp, placementId, ifa, completed]
        },
        events: {
            sql: `eventId`,
            type: `count`,
            rollingWindow: {
                trailing: `1 minute`
            }
        },
        anyEventUniq: {
            sql: `user_id`,
            type: `countDistinct`,
            title: `Any Event - Unique`
        },
        anyEvent: {
            type: `count`,
            title: `Any Event - Total`
        },
        clicks: {
            type: `count`,
            title: `All Clicks`,
            filters: [
                { sql: `${CUBE.eventType} = 'click'` }
            ]
        },
        clicksUniq: {
            type: `countDistinct`,
            title: `Clicks - Unique`,
            sql: `user_id`,
            filters: [
                { sql: `${CUBE.eventType} = 'click'` }
            ]
        },
        impressions: {
            type: `count`,
            title: `All Impressions`,
            filters: [
                { sql: `${CUBE.eventType} = 'impression'` }
            ]
        },
        impressionsUniq: {
            type: `countDistinct`,
            title: `Impressions - Unique`,
            sql: `user_id`,
            filters: [
                { sql: `${CUBE.eventType} = 'impression'` }
            ]
        },
        // uniqueUsersCount: {
        //     sql: 'user_id',
        //     type: 'countDistinct'
        // },
        // uniqueClicksCount : {
        //     sql: `${uniqueSourceCount} / nullif(${checkinsTotal}, 0)`,
        //     type: 'number'
        // }
    },
    dimensions: {
        eventTime: {
            sql: `event_time`,
            type: `time`
        },
        eventTimeTS: {
            sql: `event_time_ts`,
            type: `number`
        },
        requestId: {
            sql: `request_id`,
            type: `string`
        },
        appId: {
            sql: `app_id`,
            type: `string`
        },
        adSetId: {
            sql: `ad_set_id`,
            type: `string`
        },
        chId: {
            sql: `ch_id`,
            type: `string`
        },
        userId: {
            sql: `user_id`,
            type: `string`
        },
        offerId: {
            sql: `offer_id`,
            type: `string`
        },
        creativeId: {
            sql: `creative_id`,
            type: `string`
        },
        eventId: {
            sql: `event_id`,
            type: `string`,
            primaryKey: true
        },
        eventType: {
            sql: `event_type`,
            type: `string`
        },
        geo: {
            sql: `geo`,
            type: `string`
        },
        device: {
            sql: `device`,
            type: `string`
        },
        osVersion: {
            sql: `os_version`,
            type: `string`
        },
        deviceIp: {
            sql: `device_ip`,
            type: `string`
        },
        placementId: {
            sql: `placement_id`,
            type: `string`
        },
        ifa: {
            sql: `ifa`,
            type: `string`
                },
        completed: {
            sql: `completed`,
            type: `string`
        }
    }
});
